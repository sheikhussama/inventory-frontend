import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../../core/services/client.services';
import { ToasterService } from 'angular2-toaster';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.scss']
})
export class CustomerLedgerComponent implements OnInit {
  
  client: any;
  clientDetail: any;
  imageUrl: any;
  p = 1 ;
  currencyType: any;
  config: any;
  finishGoodsConfig: any;
  saleConfig: any;
  creditPaymentConfig: any;
  debitPaymentConfig: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(private toast: ToasterService, private clientService: ClientService ,) { }

  ngOnInit(): void {
    this.getClient();
    this.imageUrl = logoUrl;
    this.config = {
      itemsPerPage: 3,
      currentPage: 1
    };
    this.finishGoodsConfig = {
      itemsPerPage: 3,
      currentPage: 1
    };
    this.saleConfig = {
      itemsPerPage: 3,
      currentPage: 1
    };
    this.creditPaymentConfig = {
      itemsPerPage: 3,
      currentPage: 1
    };
    this.debitPaymentConfig = {
      itemsPerPage: 3,
      currentPage: 1
    };
  }
  

   getClient(){
    this.clientService.getClient().subscribe(response =>{
        this.client = response;
    })
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  pageFinishChanged(event:any){
    this.finishGoodsConfig.currentPage = event;
  }
  pageSaleChanged(event:any){
    this.saleConfig.currentPage = event;
  }
  pageCreditChanged(event:any){
    this.creditPaymentConfig.currentPage = event;
  }
  pageDebitChanged(event:any){
    this.debitPaymentConfig.currentPage = event;
  }

  selectClient(event: any){
   this.currencyType = event.currencyType
   this.getCustomerLedger(event.id);
  }

  getCustomerLedger(id: any){
    const params = {
      id: id
    }
    this.clientService.customerLedger(params).subscribe(response =>{
      this.toast.pop('success', 'Success!', 'Customer Ledger Search Compeleted.')
      this.clientDetail = response;
    })
  }

  genRawReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Raw Material Report', 350, 80);

    const imgUrl = this.imageUrl.imagebase64;
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
    var columns = [
      res.columns[0], res.columns[1],res.columns[2],
      res.columns[3], res.columns[4],res.columns[5],
      res.columns[6]
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
    pdf.save('RawMaterialReport-' + myFormattedDate +'.pdf');
  }
  genFinishReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Finish Goods Report', 350, 80);

    const imgUrl = this.imageUrl.imagebase64;
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftableFinish"));
    var columns = [
      res.columns[0], res.columns[1],res.columns[2],
      res.columns[3], res.columns[4],res.columns[5],
      res.columns[6]
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
    pdf.save('FinishGoodlReport-' + myFormattedDate +'.pdf');
  }
  genSaleReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Sale Report', 350, 80);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
  
    const imgUrl = this.imageUrl.imagebase64;
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftableSale"));
    var columns = [
      res.columns[0], res.columns[1],res.columns[2],
      res.columns[3], res.columns[4],res.columns[5],
      res.columns[6], res.columns[7],res.columns[8],
      res.columns[9], res.columns[10],res.columns[11],
      res.columns[12], res.columns[13],res.columns[14],
      res.columns[15]
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
    pdf.save('SaleReport-' + myFormattedDate +'.pdf');
  }
  genCreditPaymentReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Credit Payment Report', 350, 80);

    const imgUrl = this.imageUrl.imagebase64;
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftableCredit"));
    var columns = [
      res.columns[0], res.columns[1],res.columns[2],
      res.columns[3], res.columns[4],res.columns[5],
      res.columns[6]
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
    pdf.save('CreditPayment-Report' + myFormattedDate +'.pdf');
  }
  genDebitPaymentReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Debit Payment Report', 350, 80);

    const imgUrl = this.imageUrl.imagebase64;
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftableDeBit"));
    var columns = [
      res.columns[0], res.columns[1],res.columns[2],
      res.columns[3], res.columns[4],res.columns[5],
      res.columns[6]
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
    pdf.save('DebitPayment-Report' + myFormattedDate +'.pdf');
  }

  

}
