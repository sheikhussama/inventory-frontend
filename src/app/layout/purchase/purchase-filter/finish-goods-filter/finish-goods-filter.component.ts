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
  config: any;

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
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
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
pageChanged(event:any){
  this.config.currentPage = event;
}
onSubmit() {
  const data = this.finishGoodsFilterForm.value; 
  if(data.productId !== null ||  data.productId === null ) {
    data.productId = data.productId ? data.productId : "";
    data.distibutorId = data.distibutorId ? data.distibutorId : "";
    this.finishGoodsFilterService.purchasefinishGoodsFilter(data).subscribe((response: any) => {
      this.finishGoodsFilter = response;
      this.toast.pop('success', 'Success!', 'Finish Goods Filter Search is Completed.');
      this.callCompleted();
    });
  }
  else if(data.distibutorId !== null || data.distibutorId === null){
    this.finishGoodsFilterService.purchasefinishGoodsFilter(data).subscribe((response: any) => {
      this.finishGoodsFilter = response;
      this.toast.pop('success', 'Success!', 'Finish Goods Filter Search is Completed.');
      this.callCompleted();
    });
  }

}

callCompleted() {
  this.finishGoodsFilterForm.reset();
}

}
