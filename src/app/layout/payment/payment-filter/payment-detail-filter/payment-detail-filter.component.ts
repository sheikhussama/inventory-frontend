import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ClientService } from '../../../../core/services/client.services';
import { PaymentService } from '../../../../core/services/payment.services';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-detail-filter',
  templateUrl: './payment-detail-filter.component.html',
  styleUrls: ['./payment-detail-filter.component.css']
})
export class PaymentDetailFilterComponent implements OnInit {

  paymentDetailFilterForm: FormGroup;
  clientDetail: any[] = [];
  flag: Boolean = true;
  paymentDetailFilter: any;
  products: any[] = []; 
  blance: any;
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private paymentDetailFilterService: PaymentService,
    private clientService: ClientService) { }

  ngOnInit() {
    this.initForm();
    this.getClient();
    this.getBlance();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };

    this.imageUrl = logoUrl;

  }

  initForm() {
    this.paymentDetailFilterForm = this.fb.group({
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      isCredit: ["", [Validators.required]],
      distibutorId: ["", [Validators.required]],
  });
}
 
getBlance(){
  this.blance = [
    {
      value: true,
      Label: 'Credit'
    },
    {
      value: false,
      Label: 'Debit'
    }
  ]
}
getClient() {
  this.clientService.getClient().subscribe((response) => {
    this.clientDetail = response;
 });
} 
pageChanged(event:any){
  this.config.currentPage = event;
}
onSubmit() {
  const data = this.paymentDetailFilterForm.value; 
  if(data.distibutorId !== null ||  data.distibutorId === null ) {
    data.distibutorId = data.distibutorId ? data.distibutorId : "";
    data.isCredit = data.isCredit ? data.isCredit : "";
    this.paymentDetailFilterService.paymentDetailFilter(data).subscribe((response: any) => {
      this.paymentDetailFilter = response;
      this.toast.pop('success', 'Success!', 'Payment Detail Search is Completed.');
      this.callCompleted();
    });
  }
  else if (data.isCredit !== null ||  data.isCredit === null) {
      this.paymentDetailFilterService.paymentDetailFilter(data).subscribe((response: any) => {
        this.paymentDetailFilter = response;
        this.toast.pop('success', 'Success!', 'Payment Detail Search is Completed.');
        this.callCompleted();
      });
    }
  }

callCompleted() {
  this.paymentDetailFilterForm.reset();
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
    res.columns[9]
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
  pdf.save('PaymentsReport-' + myFormattedDate +'.pdf');
}
}
