import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../../core/services/payment.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2';
import { logoUrl } from '../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  
  purchase: any [] = [];
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private toast: ToasterService) { }

  ngOnInit(){
    this.getPayment();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;

  }

  getPayment() {
    this.paymentService.getPayments().subscribe((response) => {
      this.purchase = response;
    });
  }  

  pageChanged(event:any){
    this.config.currentPage = event;
  }
  
  updatePayment(payment: any){
    this.router.navigate(['/payment/update', payment.id]);
  }



  deletePayment(payment: any) {
    Swal.fire({
      title: '<i class="fa fa-trash" aria-hidden="true"></i>',
      text: 'Are you sure you want to delete?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.value) {
            this.paymentService.deletePayments(payment.id)
            .subscribe(
              (response: any) => {
                const index = this.purchase.indexOf(payment, 0);
                if (index > -1) {
                  this.purchase.splice(index, 1);
                  this.getPayment();
                  Swal.fire(
                    'Payment is Deleted!',
                    'success'
                  )
                }
              });
        } else {
          Swal.fire('Your Payment is safe!');
        }
      });
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
      res.columns[9], res.columns[10]
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
