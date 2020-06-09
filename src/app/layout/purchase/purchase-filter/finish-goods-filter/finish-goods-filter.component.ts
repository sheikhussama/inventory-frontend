import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PurchaseService } from '../../../../core/services/purchase.services';
import { ToasterService } from 'angular2-toaster';
import { RawMaterialService } from '../../../../core/services/materials.services';
import { ClientService } from '../../../../core/services/client.services';

@Component({
  selector: 'app-finish-goods-filter',
  templateUrl: './finish-goods-filter.component.html',
  styleUrls: ['./finish-goods-filter.component.css']
})
export class FinishGoodsFilterComponent implements OnInit {

  finishGoodsFilterForm: FormGroup;
  userID: any;
  buttonText: Boolean;
  rawMaterial: any[] = [];
  clientDetail: any[] = [];
  flag: Boolean = true;
  finishGoodsFilter: any;

  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private finishGoodsFilterService: PurchaseService,
    private materialService: RawMaterialService,
    private clientService: ClientService) { }

  ngOnInit() {
    this.initForm();
    this.getMaterial();
    this.getClient();

  }

  initForm() {
    this.finishGoodsFilterForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      distibutorId: ['', [Validators.required]],
  });
}

getMaterial() {
  this.materialService.getMaterial().subscribe((response) => {
    this.rawMaterial = response.results;
  });
}  

getClient() {
  this.clientService.getClient().subscribe((response) => {
    this.clientDetail = response.results;

 });
} 

onSubmit() {
  const data = this.finishGoodsFilterForm.value;  
    this.finishGoodsFilterService.purchasefinishGoodsFilter(data).subscribe((response: any) => {
      this.finishGoodsFilter = response;
      this.toast.pop('success', 'Success!', 'Finish Goods Filter Search is Completed.');
      this.callCompleted();
    },
    (error => {
       if(error.status === 400) {
        this.toast.pop('error', 'Error!', 'Record Not Found');
       }
    }));
}

callCompleted() {
  this.finishGoodsFilterForm.reset();
}

}
