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
      this.products = response.results;
    });
  }  
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  getsale() {
    this.saleService.getFinalSale().subscribe((response) => {
      this.sale = response.results;
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
    // $(".text-right").hide();
    pdf.addImage(imgUrl, "png", 30, 30, 70, 70);
    pdf.autoTable({
      html: '#pdftable',
      theme: 'grid',
      tableWidth: 800,
      margin: { top: 100 },
    }
      );
    pdf.save('RawProductFilterReport-' + myFormattedDate +'.pdf');
  }
}
