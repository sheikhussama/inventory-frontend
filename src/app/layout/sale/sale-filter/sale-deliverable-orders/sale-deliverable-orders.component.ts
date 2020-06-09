import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaleService } from '../../../../core/services/sale.services';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-sale-deliverable-orders',
  templateUrl: './sale-deliverable-orders.component.html',
  styleUrls: ['./sale-deliverable-orders.component.css']
})
export class SaleDeliverableOrdersComponent implements OnInit {
  orderDeliveredForm: FormGroup;
  DeliveredOrders: any;

  constructor(private fb: FormBuilder,
    private saleService: SaleService,
    private toast: ToasterService) { }

  ngOnInit(): void {
    this.initForm();
  }
  

  initForm() {
    this.orderDeliveredForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      type : [true, [Validators.required]]
  });
}

  getCheckOrder(id:any){
    this.saleService.changeOrderStatus(id).subscribe(response =>{
      this.toast.pop('success', 'Success!', 'Order has been Delivered Successfully');
    })
  }
 


  onSubmit() {
    const DeliveredOrder = this.orderDeliveredForm.value;
    this.saleService.salePendingOrders(DeliveredOrder).subscribe(response =>{
      this.DeliveredOrders = response;
        this.toast.pop('success', 'Success!', 'Delivered Order Search is Completed.');
        this.callCompleted();
      },
      (error => {
         if(error.status === 400) {
          this.toast.pop('error', 'Error!', 'Record Not Found');
         }
      }));
  }

 callCompleted() {
  this.orderDeliveredForm.reset();
}
}
