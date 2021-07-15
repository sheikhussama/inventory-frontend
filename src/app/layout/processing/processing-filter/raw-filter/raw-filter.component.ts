import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../../core/services/sale.services';
import { ProcessingService } from '../../../../core/services/processing.service';
import { RawMaterialService } from '../../../../core/services/materials.services';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-raw-filter',
  templateUrl: './raw-filter.component.html',
  styleUrls: ['./raw-filter.component.css']
})
export class RawFilterComponent implements OnInit {

  finishGoodForm: FormGroup;
  rawMat: any[] = [];
  finishGoodDetail: any;
  sale: any[] = [];
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(
    private fb: FormBuilder,
    private toast: ToasterService,
    private saleService: SaleService,
    private materialService: RawMaterialService,
    private processingService: ProcessingService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getMaterial();
    this.getsale();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;
  }

  initForm() {
    this.finishGoodForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      saleId: ['', [Validators.required]],
    });
  }

  getMaterial() {
    this.materialService.getMaterial().subscribe((response) => {
      this.rawMat = response;
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
    const data = this.finishGoodForm.value;
    if(data.productId !== null ||  data.productId === null ) {
      data.productId = data.productId ? data.productId : "";
      data.saleId = data.saleId ? data.saleId : "";
      this.processingService.filterRawFinishGoods(data).subscribe((response: any) => {
        this.finishGoodDetail = response;
        this.toast.pop('success', 'Success!', 'Finish Good History Search is Completed.');
        this.callCompleted();
      });
     }
    else if (data.saleId !== null || data.saleId === null) {
      this.processingService.filterRawFinishGoods(data).subscribe((response: any) => {
        this.finishGoodDetail = response;
        this.toast.pop('success', 'Success!', 'Finish Good History Search is Completed.');
        this.callCompleted();
      });
    }
  }
  callCompleted() {
    this.finishGoodForm.reset();
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
    pdf.save('FinishGoodFilterReport-' + myFormattedDate +'.pdf');
  }

}
