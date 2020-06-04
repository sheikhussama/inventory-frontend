import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EndProductService } from '../../../../core/services/end-product.services';
import { ProductService } from '../../../../core/services/products.services';

@Component({
  selector: 'app-end-product',
  templateUrl: './end-product.component.html',
  styleUrls: ['./end-product.component.css']
})
export class EndProductComponent implements OnInit {
  
  endProductForm: FormGroup;
  userID: any;
  endProductID: any; 
  endProductDetail: any; 
  buttonText: Boolean;
  products: any[] = []; 

  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private endProductService: EndProductService,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if ((this.router.url).includes('update')) {
        this.updateFlowInit(params);
      }
    });
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.initForm();
    this.getProduct();

  }


  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.endProductID = params.get('id');
      this.viewendProduct();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard']);
    }
  }


  getProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.results;
    });
  }  

  viewendProduct() {
    this.endProductService.viewEndProducts(this.endProductID).subscribe((response) => {
      this.endProductDetail = response;
        this.preFilledForm(this.endProductDetail);
    });
  }

  initForm() {
    this.endProductForm = this.fb.group({
      id: this.endProductID ? this.endProductID : '', // to handle update flow only for class.
      productName: ['', [Validators.required]],
  });
}

onSubmit() {
  const data = this.endProductForm.value;
  data.user = this.userID.user_id;
  if (data.id > 0) {
    this.endProductService.updateEndProducts(data, data.id).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Deliverable Product has been Updated.');
      this.callCompleted();
    });
  } else {
    this.endProductService.storeEndProducts(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Deliverable has been Created.');
      this.callCompleted();
    });
  }
}


callCompleted() {
  this.endProductForm.reset();
  this.router.navigate(['/products/endProduct']);
}

preFilledForm(endProduct: any) {
  this.endProductForm.get('productName').setValue(endProduct.productName);
}

get productName() {
  return this.endProductForm.get('productName');
}
}
