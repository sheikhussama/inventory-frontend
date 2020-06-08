import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaleService } from '../../../../core/services/sale.services';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-sale-pending-orders',
  templateUrl: './sale-pending-orders.component.html',
  styleUrls: ['./sale-pending-orders.component.css']
})
export class SalePendingOrdersComponent implements OnInit {
  
  orderPendingForm: FormGroup;
  pendingOrders: any;

  constructor(private fb: FormBuilder,
    private saleService: SaleService,
    private toast: ToasterService) { }

  ngOnInit(): void {
    this.initForm();
  }
  

  initForm() {
    this.orderPendingForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      type : [false, [Validators.required]]
  });
}

  getCheckOrder(id:any){
    this.saleService.changeOrderStatus(id).subscribe(response =>{
      this.toast.pop('success', 'Success!', 'Order has been Delivered Successfully');
    })
  }
 


  onSubmit() {
    const pendingOrder = this.orderPendingForm.value;
    this.saleService.salePendingOrders(pendingOrder).subscribe(response =>{
      this.pendingOrders = response;
      console.log(this.pendingOrders);
        this.toast.pop('success', 'Success!', 'Pending Order Search is Completed.');
        this.callCompleted();
      },
      (error => {
         if(error.status === 400) {
          this.toast.pop('error', 'Error!', 'Record Not Found');
         }
      }));
  }

 callCompleted() {
  this.orderPendingForm.reset();
}
}
