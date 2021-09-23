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
  selector: 'app-expense-detail-filter',
  templateUrl: './expense-detail-filter.component.html',
  styleUrls: ['./expense-detail-filter.component.css']
})
export class ExpenseDetailFilterComponent implements OnInit {

  paymentDetailFilterForm: FormGroup;
  clientDetail: any[] = [];
  flag: Boolean = true;
  expense: any;
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
      // isCredit: ["", [Validators.required]],
      // distibutorId: ["", [Validators.required]],
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

pageChanged(event:any){
  this.config.currentPage = event;
}
onSubmit() {
  const data = this.paymentDetailFilterForm.value; 
  this.paymentDetailFilterService.expenseDetailFilter(data).subscribe((response: any) => {
    this.expense = response;
    this.toast.pop('success', 'Success!', 'Expense Detail Search is Completed.');
    this.callCompleted();
  });
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
    res.columns[3]
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
  pdf.save('ExpenseFilterReport-' + myFormattedDate +'.pdf');
}
}
