import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { FinishGoodsService } from '../../../../core/services/finish-goods.services';
import { RawMaterialService } from '../../../../core/services/materials.services';
import { ClientService } from '../../../../core/services/client.services';

@Component({
  selector: 'app-create-listing-finish',
  templateUrl: './create-listing-finish.component.html',
  styleUrls: ['./create-listing-finish.component.css']
})
export class CreateListingFinishComponent implements OnInit {

  finishGoodsForm: FormGroup;
  userID: any;
  finishGoodsID: any; 
  finishGoodsDetail: any; 
  buttonText: Boolean;
  clientDetail: any[] = [];
  rawMaterial: any[] = [];
  flag: Boolean = true;
  currencyValue: any;

  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private finishGoodsService: FinishGoodsService,
    private router: Router,
    private route: ActivatedRoute,
    private materialService: RawMaterialService,
    private clientService: ClientService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if ((this.router.url).includes('update')) {
        this.updateFlowInit(params);
      }
    });
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.initForm();
    this.getMaterial();
    this.getClient();
  }

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.finishGoodsID = params.get('id');
      this.viewfinishGoods();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard']);
    }
  }

  
  currencyType($event: any){
    this.currencyValue = $event.currencyType;
}

  viewfinishGoods() {
    this.finishGoodsService.viewfinishGoods(this.finishGoodsID).subscribe((response) => {
      this.finishGoodsDetail = response;
        this.preFilledForm(this.finishGoodsDetail);
    });
  }

  initForm() {
    this.finishGoodsForm = this.fb.group({
      id: this.finishGoodsID ? this.finishGoodsID : '', // to handle update flow only for class.
      DcNo: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      productId: [null, [Validators.required]],
      distibutorId: [null, [Validators.required]],
      currencyType: '',

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
  const data = this.finishGoodsForm.value;
  data.user = this.userID.user_id;
  if (data.id > 0) {
    this.finishGoodsService.updatefinishGoods(data, data.id).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Finish Goods has been Updated.');
      this.callCompleted();
    });
  } else {
    this.finishGoodsService.storefinishGoods(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Finish Goods has been Created.');
      this.callCompleted();
    });
  }
}

callCompleted() {
  this.finishGoodsForm.reset();
  this.router.navigate(['/purchase/finishGoods']);
}

preFilledForm(finishGoods: any) {
  this.finishGoodsForm.get('DcNo').setValue(finishGoods.DcNo);
  this.finishGoodsForm.get('Quantity').setValue(finishGoods.Quantity);
  this.finishGoodsForm.get('price').setValue(finishGoods.price);
  this.finishGoodsForm.get('productId').setValue(finishGoods.productId);
  this.finishGoodsForm.get('distibutorId').setValue(finishGoods.distibutorId);
  this.finishGoodsForm.get('currencyType').setValue(finishGoods.rawpurchase_customer.currencyType);

}


get DcNo() {
  return this.finishGoodsForm.get('DcNo');
}
get Quantity() {
  return this.finishGoodsForm.get('Quantity');
}
get price() {
  return this.finishGoodsForm.get('price');
}
get bulkQuantity() {
  return this.finishGoodsForm.get('bulkQuantity');
}
get distibutorId() {
  return this.finishGoodsForm.get('distibutorId');
}
get productId() {
  return this.finishGoodsForm.get('productId');
}
}
