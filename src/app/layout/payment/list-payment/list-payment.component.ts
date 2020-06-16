import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../core/services/payment.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  
  purchase: any [] = [];
  config: any;

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
  }

  getPayment() {
    this.paymentService.getPayments().subscribe((response) => {
      this.purchase = response.results;
    });
  }  

  pageChanged(event:any){
    this.config.currentPage = event;
  }
  
  updatePayment(payment: any){
    this.router.navigate(['/payment/update', payment.id]);
  }

  deletePayment(payment: any) {
    this.paymentService.deletePayments(payment.id)
      .subscribe(
        (response: any) => {
          const index = this.purchase.indexOf(payment, 0);
          if (index > -1) {
            this.purchase.splice(index, 1);
            this.getPayment();
            this.toast.pop('success', 'Your Payment Delete is not recover');
          }
          else {
            this.toast.pop('error', 'Your Payment is safe!');
          }
        });
  }

}
