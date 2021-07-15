import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../../core/services/sale.services';
import { ProductService } from '../../../../core/services/products.services';
import { ProcessingService } from '../../../../core/services/processing.service';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.css']
})
export class RecipeFilterComponent implements OnInit {

   recipeForm: FormGroup;
   products: any [] = [];
   recipeDetail: any;
   sale: any[] = []; 
   config: any;
   imageUrl: any;
   @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
   
   constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private saleService: SaleService,
    private productService: ProductService,
    private processingService: ProcessingService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getProduct(); 
    this.getsale();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;

  }

  initForm() {
    this.recipeForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      saleId: ['', [Validators.required]],
  });
}

  getProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }  
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  getsale() {
    this.saleService.getFinalSale().subscribe((response) => {
      this.sale = response;
    });
  }

  onSubmit() {
    const data = this.recipeForm.value;  
      this.processingService.filterRaw(data).subscribe((response: any) => {
        this.recipeDetail = response;
        this.toast.pop('success', 'Success!', 'Raw Product History Search is Completed.');
        this.callCompleted();
      },
      (error => {
         if(error.status === 400) {
          this.toast.pop('error', 'Error!', 'Record Not Found');
         }
      }));
  }

  callCompleted() {
    this.recipeForm.reset();
  }

  genReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Expense Report', 350, 80);
  
    const imgUrl = this.imageUrl.imagebase64;
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
    var columns = [
      res.columns[0], res.columns[1],res.columns[2],
      res.columns[3], res.columns[4],res.columns[5],
      res.columns[6], res.columns[7],res.columns[8],
      res.columns[9], res.columns[10],res.columns[11],
      res.columns[12], res.columns[13]
    ];
    pdf.addImage(imgUrl, "png", 20, 20, 70, 70);
    pdf.autoTable(columns, res.data,{
      theme: 'grid',
      tableWidth: 750,
      margin: { top: 100 },
      styles: {
        fontSize: 9,
        font: 'helvetica',
        fontType: 'bold',
        }
    });
    pdf.save('RawProductFilterReport-' + myFormattedDate +'.pdf');
  }
}
