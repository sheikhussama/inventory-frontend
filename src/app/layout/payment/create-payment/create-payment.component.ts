import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment.services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../core/services/client.services';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {

  paymentForm: FormGroup;
  userID: any;
  paymentID: any; 
  paymentDetail: any; 
  buttonText: Boolean;
  type: any;
  clientDetail: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if ((this.router.url).includes('update')) {
        this.updateFlowInit(params);
      }
    });
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.initForm();
    this.givenType();
    this.getClient();
  }


givenType() {
  this.type = [
     { 
       id : "C",
       value: "Cash"
      },
      { 
        id : "Q",
        value: "Cheaque"
       },
       { 
        id : "T",
        value: "Transfer"
       },
  ]
}

getClient() {
  this.clientService.getClient().subscribe((response) => {
    this.clientDetail = response.results;
 });
} 

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.paymentID = params.get('id');
      this.viewPayment();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard/class']);
    }
  }

  viewPayment() {
    this.paymentService.viewPayments(this.paymentID).subscribe((response) => {
      this.paymentDetail = response;
        this.preFilledForm(this.paymentDetail);
    });
  }

  initForm() {
    this.paymentForm = this.fb.group({
      id: this.paymentID ? this.paymentID : '', // to handle update flow only for class.
      detail: ['', [Validators.required]],
      isCredit: ['', [Validators.required]],
      isCustomer: ['', [Validators.required]],
      givenType: [null, [Validators.required]],
      amount: ['', [Validators.required]],
      distibutorId: [null, [Validators.required]]
  });
}

onSubmit() {
  const data = this.paymentForm.value;
  data.user = this.userID.user_id;
  if (data.id > 0) {
    this.paymentService.updatePayments(data, data.id).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Payment has been Updated.');
      this.callCompleted();
    });
  } else {
    this.paymentService.storePayments(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Payment has been Created.');
      this.callCompleted();
    });
  }
}


callCompleted() {
  this.paymentForm.reset();
  this.router.navigate(['/payment']);
}

preFilledForm(payment: any) {
  this.paymentForm.get('amount').setValue(payment.amount);
  this.paymentForm.get('givenType').setValue(payment.givenType);
  this.paymentForm.get('isCredit').setValue(payment.isCredit);
  this.paymentForm.get('distibutorId').setValue(payment.distibutorId);
  this.paymentForm.get('isCustomer').setValue(payment.isCustomer);
  this.paymentForm.get('detail').setValue(payment.detail);
 }
}
