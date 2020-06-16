import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../../core/services/sale.services';
import { ClientService } from '../../../../core/services/client.services';
import { EndProductService } from '../../../../core/services/end-product.services';

@Component({
  selector: 'app-sale-history',
  templateUrl: './sale-history.component.html',
  styleUrls: ['./sale-history.component.css']
})
export class SaleHistoryComponent implements OnInit {

  saleHistoryForm: FormGroup;
  userID: any;
  buttonText: Boolean;
  endProducts: any[] = [];
  clientDetail: any[] = [];
  flag: Boolean = true;
  saleHistory: any;
  config: any;

  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private saleService: SaleService,
    private endProductService: EndProductService,   
     private clientService: ClientService) { }

  ngOnInit() {
    this.initForm();
    this.getClient();
    this.endProduct();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  initForm() {
    this.saleHistoryForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
  });
}

endProduct() {
  this.endProductService.getEndProducts().subscribe((response) => {
    this.endProducts = response.results;
  });
}
pageChanged(event:any){
  this.config.currentPage = event;
}
getClient() {
  this.clientService.getClient().subscribe((response) => {
    this.clientDetail = response.results;

 });
} 

onSubmit() {
  const data = this.saleHistoryForm.value;  
    this.saleService.saleHistory(data).subscribe((response: any) => {
      this.saleHistory = response;
      this.toast.pop('success', 'Success!', 'Sale Hsitory Search is Completed.');
      this.callCompleted();
    },
    (error => {
       if(error.status === 400) {
        this.toast.pop('error', 'Error!', 'Record Not Found');
       }
    }));
}

callCompleted() {
  this.saleHistoryForm.reset();
}
}
