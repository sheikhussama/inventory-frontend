import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RawMaterialService } from '../../../core/services/materials.services';
import { SaleService } from '../../../core/services/sale.services';
import { ProcessingService } from '../../../core/services/processing.service';
import { ProductService } from '../../../core/services/products.services';

declare const $ :any;

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
  QuantityUnit = [];
  QuantityUnitKg = [];
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
  recipeDataListUnique: any [] = [];
  rawDataListUnique: any[] = [];

  hideShow:Boolean;
  onlyShow: Boolean;
  showData:any;
  recipieQValue: any;
  rawQValue: any;
  rawproductID: any;
  showAddOptions: Boolean;
  editOptions: Boolean;
  finishGoodproductID: any;
  unitShowType: any;
  updateQuantityInKg:any;
  updateQuantityInUnit:any;
  finishGoodsProductName: any;
  productId: any;

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
          this.showAddOptions = true;
          this.editOptions = false;
          this.initCreateForm();
        } else {
          this.toast.pop('error', 'Opps!', 'Invalid request params');
          this.router.navigate(['/dashboard/processing']);
        }
      } else if ((this.router.url).includes('update')) {
        this.processingID = params.get('id');
        this.updateFlowInit(params);
        this.hideShow = true
        this.editOptions = true;
        this.showAddOptions = false;
        this.onlyShow = false;
        this.initUpdateForm();
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

  initCreateForm() {
    this.processingForm = this.fb.group({
      raw: this.fb.array([this.rawItem()]),
      recipie: this.fb.array([this.receipeItem()])
    });

  }


  initUpdateForm() {
    this.processingForm = this.fb.group({
      raw: this.fb.array([]),
      recipie: this.fb.array([])
    });

  }

  showProcessing(){
    this.processingService.viewRawRecipeDetail(this.processingID).subscribe((response) => {
      this.processing = response;
    });
  }

  unitType($event: any,index: any){
    this.productId = $event.id;
    this.productName = $event.productName;
    this.QuantityUnit[index] = $event.QuantityInUnit;
    this.QuantityUnitKg[index] = $event.QuantityInKg;
    this.rawproductID = $event.id;
    this.listOfUnit = $event.unit;
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
      QuantityUnitKg: [''],
      QuantityUnit: [''],
      recipieQuantity: [null, Validators.required],
      unit: null,
      saleId: this.processingID ? this.processingID : this.processingID,
      ProductId: [null, Validators.required],
      user: this.userID ? this.userID : this.userID
    });
  }


  viewRawRecipeDetail() {
    this.processingService.viewRawRecipeDetail(this.processingID).subscribe((response) => {
      this.processing = response;
      this.preFilledForm( this.processing);
    });
  }

  recipieQuantityEvent($event){;
    this.recipieQValue = $event.srcElement.value
  }

  recipieType($event: any , index :any){
    const params = {
      ProductId:  this.rawproductID,
      productName: this.productName,
      QuantityUnitKg: this.QuantityUnitKg[index],
      QuantityUnit: this.QuantityUnit[index],
      recipieQuantity: this.recipieQValue,
      unit: this.listOfUnit,
      saleId: this.processingID ? this.processingID : this.processingID,
      user: this.userID ? this.userID : this.userID
    }

    this.recipeDataList.push(params);
    const seenNames = {};
    this.recipeDataList = this.recipeDataList.filter(function(currentObject) {
        if (currentObject.ProductId in seenNames) {
            return false;
        } else {
            seenNames[currentObject.ProductId] = true;
            return true;
        }
    });

  }

  unitFinishType($event: any){
    this.finishGoodsProductName = $event.productName
    this.finishGoodproductID = $event.id
  
  }

  rawQuantityEvent($event: any){
    this.rawQValue = $event.srcElement.value
  }

  
  rawType($event: any){
    this.rawShow = true;
    const params = {
        ProductId:  this.finishGoodproductID,
        productName: this.finishGoodsProductName,
        rawQuantity:  this.rawQValue,
        saleId: this.processingID ? this.processingID : this.processingID,
        user: this.userID ? this.userID : this.userID
    }
    this.rawDataList.push(params);

    const seenNames = {};
    let thus = this; 
    this.rawDataList = this.rawDataList.filter(function(currentObject) {
        if (currentObject.ProductId in seenNames) {
          thus.toast.pop('error', 'Error!' , 'Item Already Added') 
            return false;
        } else {
            seenNames[currentObject.ProductId] = true;
            return true;
        }
    });

  }


  onSubmit() {
    const data = this.processingForm.value;
    if ((this.router.url).includes('detail')) {
      this.processingService.storeRecipe(this.recipeDataList).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Raw Material has been Created.');
        this.callCompleted();
      });
      this.processingService.storeRaw(this.rawDataList).subscribe((response: any) => {
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
        QuantityUnitKg: x.product_recipie.QuantityInKg,
        QuantityUnit: x.product_recipie.QuantityInUnit,
        recipieQuantity: x.recipieQuantity,
        ProductId: x.product_recipie.id,
        user: x.user,
        saleId: x.saleId,
        unit: x.unit
      }));
    });
  }

}
