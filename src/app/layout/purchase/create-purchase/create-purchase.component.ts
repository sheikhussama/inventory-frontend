import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseService } from '../../../core/services/purchase.services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/products.services';
import { ClientService } from '../../../core/services/client.services';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.css']
})
export class CreatePurchaseComponent implements OnInit {

  purchaseForm: FormGroup;
  userID: any;
  purchaseID: any; 
  purchaseDetail: any; 
  buttonText: Boolean;
  flag: Boolean = true;
  bulk:Number = 0;
  kg: Number = 0;
  type: any;
  unit: any;
  product: any;
  clientDetail: any[] = [];
  calUnit: any;
  total: any = "Total Quantity";
  totalUnit:any = "Quantity In Unit"
  showHide: Boolean;
  unitName: string;

  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private purchaseService: PurchaseService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if ((this.router.url).includes('update')) {
        this.updateFlowInit(params);
      }
    });
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.initForm();
    this.typeBased();
    this.unitBased();
    this.getProduct();
    this.getClient();
  }


  bulkQuantity(event: any){
    this.bulk = event.srcElement.value;
    this.totalQuantity();
  }
  QuantityInKg(event: any){
    this.kg = event.srcElement.value
    this.totalQuantity();
  }
  
  selectInput(event: any) {
    if (event.value === "Drum" || event.value === "Bag") {
      this.showHide = true;
    } else {
      this.showHide = false;
    }
  }

  totalQuantity() {
     if(this.kg !== undefined) {
      this.total =  +this.bulk * +this.kg;
      console.log(this.total);
     }
  }
  
  QuantityUnit(event: any) {
    if(event.value === "L"){
      this.totalUnit = this.total * 1.2;
      this.unitName = "Ltr" 
    }
    if(event.value === "G"){
      this.totalUnit = this.total * 1000;
      this.unitName = "Gram" 
    }
  }

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.purchaseID = params.get('id');
      this.viewpurchase();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard']);
    }
  }

  getClient() {
    this.clientService.getClient().subscribe((response) => {
      this.clientDetail = response.results;
   });
  } 

  viewpurchase() {
    this.purchaseService.viewPurchase(this.purchaseID).subscribe((response) => {
      this.purchaseDetail = response;
        this.preFilledForm(this.purchaseDetail);
    });
  }


  initForm() {
    this.purchaseForm = this.fb.group({
      id: this.purchaseID ? this.purchaseID : '', // to handle update flow only for class.
      DcNo: ['', [Validators.required]],
      type: [null, [Validators.required]],
      bulkQuantity: ['', [Validators.required]],
      QuantityInKg: ['', [Validators.required]],
      unit: [null, [Validators.required]],
      perUnitQuantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      productId: [null, [Validators.required]],
      distibutorId: [null, [Validators.required]],
  });
}


onSubmit() {
  const data = this.purchaseForm.value;
  data.QuantityInKg = parseInt(this.total);
  data.perUnitQuantity = parseInt(this.totalUnit);
  data.user = this.userID.user_id;

  if (data.id > 0) {
    this.purchaseService.updatePurchase(data, data.id).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Purchase has been Updated.');
      this.callCompleted();
    });
  } else {
    this.purchaseService.storePurchase(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Purchase has been Created.');
      this.callCompleted();
    });
  }
}

getProduct() {
  this.productService.getProducts().subscribe((response) => {
    this.product = response.results;
  });
}  


callCompleted() {
  this.purchaseForm.reset();
  this.router.navigate(['/purchase']);
      this.flag = false;
    setTimeout(() => {this.flag = true;})
}

typeBased() {
  this.type = [
     {
      id: '1',
      value: 'Drum'
     },
     {
      id: '2',
      value: 'Bag'
     }
  ]
}

unitBased() {
  this.unit = [
     {
      id: '1',
      value: 'L',
     },
     {
      id: '2',
      value: 'G',
     }
  ]
}

  // roleBased() {
  //   this.role = [
  //      {
  //       id: 'D',
  //       value: 'Distributor'
  //      },
  //      {
  //       id: 'C',
  //       value: 'Customer'
  //      }
  //   ]
  // }


  preFilledForm(purchase: any) {
    this.purchaseForm.get('DcNo').setValue(purchase.DcNo);
    this.purchaseForm.get('type').setValue(purchase.type);
    this.purchaseForm.get('bulkQuantity').setValue(purchase.bulkQuantity);
    this.purchaseForm.get('QuantityInKg').setValue(purchase.QuantityInKg);
    this.purchaseForm.get('unit').setValue(purchase.unit);
    this.purchaseForm.get('perUnitQuantity').setValue(purchase.perUnitQuantity);
    this.purchaseForm.get('price').setValue(purchase.price);
    this.purchaseForm.get('distibutorId').setValue(purchase.distibutorId);
    this.purchaseForm.get('productId').setValue(purchase.productId);


  }
}
