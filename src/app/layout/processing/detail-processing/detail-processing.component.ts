import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RawMaterialService } from '../../../core/services/materials.services';
import { SaleService } from '../../../core/services/sale.services';
import { ProcessingService } from '../../../core/services/processing.service';
import { ProductService } from '../../../core/services/products.services';

@Component({
  selector: 'app-detail-processing',
  templateUrl: './detail-processing.component.html',
  styleUrls: ['./detail-processing.component.css']
})
export class DetailProcessingComponent implements OnInit {

  processingID: any;
  processingForm: FormGroup;
  processing: any;
  endProduct: any;
  clientDetail: any;
  flag: Boolean = true;
  rawMaterial: any;
  user: any;
  unit: any;
  buttonText: Boolean;
  rawRecipeDetail: any;
  userID: any;
  productID: any;

  constructor(
    private toast: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private saleService: SaleService,
    private productService: ProductService,
    private materialService: RawMaterialService,
    private processingService: ProcessingService
  ) { }

  ngOnInit(): void {

    this.getEndProduct();
    this.unitBased();
    this.getMaterial();
    this.user = JSON.parse(localStorage.getItem('profileDetail'));
    this.userID = this.user.user_id;
    console.log(this.userID);
    this.route.paramMap.subscribe((params) => {
      if ((this.router.url).includes('detail')) {
        if (params.has('id')) {
          this.processingID = params.get('id');
          this.viewProcessing();
          this.initForm();
        } else {
          this.toast.pop('error', 'Opps!', 'Invalid request params');
          this.router.navigate(['/dashboard/processing']);
        }
      } else if ((this.router.url).includes('update')) {
        this.updateFlowInit(params);
        this.initForm();
      }
    });
  }

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.processingID = params.get('id');
      this.viewRawRecipeDetail();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard']);
    }
  }


  viewProcessing() {
    this.saleService.viewFinalSale(this.processingID).subscribe((response) => {
      this.processing = response;
    });
  }

  initForm() {
    this.processingForm = this.fb.group({
      raw: this.fb.array([this.rawItem()]),
      recipie: this.fb.array([this.receipeItem()])
    });
  }


  rawItem(): FormGroup {
    return this.fb.group({
      rawQuantity: ['', Validators.required],
      saleId: this.processingID ? this.processingID : null,
      ProductId: [null, Validators.required],
      user: this.userID ? this.userID : this.userID
    });
  }

  receipeItem(): FormGroup {
    return this.fb.group({
      recipieQuantity: [null, Validators.required],
      unit: null,
      saleId: this.processingID ? this.processingID : this.processingID,
      ProductId: [null, Validators.required],
      user: this.userID ? this.userID : this.userID
    });
  }


  viewRawRecipeDetail() {
    this.processingService.viewRawRecipeDetail(this.processingID).subscribe((response) => {
      this.rawRecipeDetail = response;
      this.preFilledForm(this.rawRecipeDetail);
    });
  }


  onSubmit() {
    const data = this.processingForm.value;
    if ((this.router.url).includes('detail')) {
      this.processingService.storeRecipe(data.recipie).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Raw Material has been Created.');
        this.callCompleted();
      });
      this.processingService.storeRaw(data.raw).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Finish Goods has been Updated.');
        this.callCompleted();
      });
    }
    else if ((this.router.url).includes('uodate')) {
      this.processingService.updateRawMaterial(data.recipie,this.processingID).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Raw Material has been Created.');
        this.callCompleted();
      });
      this.processingService.updateFinishGoods(data.raw, this.processingID).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Finish Goods has been Updated.');
        this.callCompleted();
      });
    }
  }

  callCompleted() {
    this.processingForm.reset();
  }

  addRaw() {
    this.raw.push(this.rawItem());
  }

  addRecipe() {
    this.recipie.push(this.receipeItem());
  }

  removeRaw(index: any) {
    this.raw.removeAt(index);
  }
  removeRecipie(index: any) {
    this.recipie.removeAt(index);
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

  getEndProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.endProduct = response.results;
    });
  }

  getMaterial() {
    this.materialService.getMaterial().subscribe((response) => {
      this.rawMaterial = response.results;
    });
  }

  get raw() {
    return this.processingForm.get('raw') as FormArray;
  }
  get recipie() {
    return this.processingForm.get('recipie') as FormArray;
  }

  preFilledForm(viewDetail: any) {
    let controlRaw = <FormArray>this.processingForm.controls.raw;
    viewDetail.sale_rawrecipie.forEach(x => {
      controlRaw.push(this.fb.group(x));
    })
    let controlRecipie = <FormArray>this.processingForm.controls.recipie;
    viewDetail.sale_recipie.forEach(x => {
      console.log(x)
      controlRecipie.push(this.fb.group(x));
    })
  }

}
