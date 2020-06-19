import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ClientService } from '../../../../core/services/client.services';
import { PaymentService } from '../../../../core/services/payment.services';

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
  }

  initForm() {
    this.paymentDetailFilterForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      isCredit: ['', [Validators.required]],
      distibutorId: ['', [Validators.required]],
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
    this.clientDetail = response.results;
 });
} 
pageChanged(event:any){
  this.config.currentPage = event;
}
onSubmit() {
  const data = this.paymentDetailFilterForm.value;  
    this.paymentDetailFilterService.paymentDetailFilter(data).subscribe((response: any) => {
      this.paymentDetailFilter = response;
      this.toast.pop('success', 'Success!', 'Payment Detail Search is Completed.');
      this.callCompleted();
    });
}

callCompleted() {
  this.paymentDetailFilterForm.reset();
}
}
