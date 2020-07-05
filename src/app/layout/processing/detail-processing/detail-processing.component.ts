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
  productRawRecipie: any;
  rawQuantity: any;
  QuantityUnit: any;
  QuantityUnitKg: any;
  recipeList: any;
  rawList:any;
  productName: any;
  listOfUnit: any;
  recipieShow: Boolean;
  rawShow: Boolean;
  recipieQuantity: any;
  rawQuantitys: any;
  recipeDataList: any[] = [];
  rawDataList: any[] = [];
  hideShow:Boolean;
  onlyShow: Boolean;
  showData:any;
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
    this.route.paramMap.subscribe((params) => {
      if ((this.router.url).includes('detail')) {
        if (params.has('id')) {
          this.processingID = params.get('id');
          this.viewProcessing();
          this.hideShow = true;
          this.onlyShow = false;
          this.initForm();
        } else {
          this.toast.pop('error', 'Opps!', 'Invalid request params');
          this.router.navigate(['/dashboard/processing']);
        }
      } else if ((this.router.url).includes('update')) {
        this.processingID = params.get('id');
        this.viewRawRecipeDetail();
        this.updateFlowInit(params);
        this.hideShow = true;
        this.onlyShow = false;
        this.initForm();
      }
      else if ((this.router.url).includes('show')){
        this.processingID = params.get('id');
        this.hideShow = false;
        this.onlyShow = true;
        this.showProcessing();
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

  showProcessing(){
    this.processingService.viewRawRecipeDetail(this.processingID).subscribe((response) => {
      this.processing = response;
      console.log()
    });
  }

  unitType($event: any){
    this.productName = $event.productName;
    this.QuantityUnit = $event.QuantityInUnit;
    this.QuantityUnitKg = $event.QuantityInKg;
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

  listUnit($event: any){
   this.listOfUnit = $event.value
}

  viewRawRecipeDetail() {
    this.processingService.viewRawRecipeDetail(this.processingID).subscribe((response) => {
      this.processing = response;
      this.preFilledForm( this.processing);
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
        this.toast.pop('success', 'Success!', 'Finish Goods has been Created.');
        this.callCompleted();
      });
    }
    else if ((this.router.url).includes('update')) {
      this.processingService.updateFinishGoods(data.raw).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Finish Goods has been Updated.');
        this.callCompleted();
      });
      this.processingService.updateRawMaterial(data.recipie).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Raw Material has been Updated.');
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
        value: 'LTR',
      },
      {
        id: '2',
        value: 'GRAMS',
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

  recipieType($event: any){
    this.recipieShow = true;
    this.recipeList = $event.value;
    this.recipieQuantity = $event.value.recipieQuantity;
    this.toast.pop('success', 'Success!', 'Add Raw Material')
     
    this.recipeDataList.push({
      productName: this.productName,
      QuantityUnitKg: this.QuantityUnitKg,
      QuantityUnit: this.QuantityUnit,
      recipieQuantity: this.recipieQuantity,
      listOfUnit: this.listOfUnit
    });
  }

  
  rawType($event: any){
    this.rawShow = true;
    this.rawList = $event.value;
    this.rawQuantitys = $event.value.rawQuantity;
    this.toast.pop('success', 'Success!', 'Add Finish Goods');
    this.rawDataList.push({
      productName: this.productName,
      rawQuantitys:  this.rawQuantitys,
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
    viewDetail.sale_rawrecipie.forEach((x: any, index: any) => {
      controlRaw.push(this.fb.group({
        rawQuantity: x.rawQuantity,
        ProductId: x.product_rawrecipie.id,
        user: x.user,
        saleId: x.saleId
      }));
    });

    let controlRecipie = <FormArray>this.processingForm.controls.recipie;
    viewDetail.sale_recipie.forEach(x => {
      controlRecipie.push(this.fb.group({
        recipieQuantity: x.recipieQuantity,
        ProductId: x.product_recipie.id,
        user: x.user,
        saleId: x.saleId,
        unit: x.unit
      }));
    });
  }

}
