import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/products.services';


@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {
  
  type: any;
  unit: any;
  productForm: FormGroup;
  userID: any;
  productID: any; 
  productDetail: any; 
  buttonText: Boolean;
  bulk:any;
  kg: any;
  calUnit: any;
  total: any = "Total Quantity";
  totalUnit:any = "Quantity In Unit"
  showHide: Boolean;
  flag: Boolean = true;
  unitName: string;
  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private productsService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

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
  }


  selectInput(event: any) {
    if (event.value === "Drum" || event.value === "Bag") {
      this.showHide = true;
    } else {
      this.showHide = false;
    }
  }

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.productID = params.get('id');
      this.viewProduct();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard']);
    }
  }

  viewProduct() {
    this.productsService.viewProducts(this.productID).subscribe((response) => {
      this.productDetail = response;
        this.preFilledForm(this.productDetail);
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      id: this.productID ? this.productID : '', // to handle update flow only for class.
      productName: ['', [Validators.required]],
      DcNo: ['', [Validators.required]],
      bulkQuantity: ['', [Validators.required]],
      type: [null, [Validators.required]],
      QuantityInKg: ['', [Validators.required]],
      unit: [null, [Validators.required]],
      QuantityInUnit: ['', [Validators.required]],
  });
}

bulkQuantity(event: any){
  this.bulk = event.srcElement.value;
  this.totalQuantity();
}
QuantityInKg(event: any){
  this.kg = event.srcElement.value
  this.totalQuantity();
}

totalQuantity() {
   if(this.kg !== undefined) {
    this.total =  this.bulk * this.kg;
   }
}

QuantityUnit(event: any) {
  if(event.value === "L"){
    this.totalUnit = this.total * 1.11;
    this.unitName = 'Ltr'
  }
  if(event.value === "G"){
    this.unitName = 'Gram'
    this.totalUnit = this.total * 1000;
  }
}

onSubmit() {
  const data = this.productForm.value;
  data.QuantityInKg = parseInt(this.total);
  data.QuantityInUnit = parseInt(this.totalUnit);
  data.user = this.userID.user_id;

  if (data.id > 0) {
    this.productsService.updateProducts(data, data.id).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Product has been Updated.');
      this.callCompleted();
    });
  } else {
    this.productsService.storeProducts(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Product has been Created.');
      this.callCompleted();
    });
  }
}

callCompleted() {
  this.productForm.reset();
  this.router.navigate(['/products']);
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


  preFilledForm(product: any) {
    this.productForm.get('productName').setValue(product.productName);
    this.productForm.get('DcNo').setValue(product.DcNo);
    this.productForm.get('bulkQuantity').setValue(product.bulkQuantity);
    this.productForm.get('type').setValue(product.type);
    this.productForm.get('unit').setValue(product.unit);
    this.productForm.get('QuantityInUnit').setValue(product.QuantityInUnit);
    this.productForm.get('QuantityInKg').setValue(product.QuantityInKg);
  }

}
