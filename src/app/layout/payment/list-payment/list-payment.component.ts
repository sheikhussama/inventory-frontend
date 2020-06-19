import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../core/services/payment.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2'

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

}
