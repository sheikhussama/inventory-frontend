import { Component, OnInit, Input } from '@angular/core';
import { EndProductService } from '../../../core/services/end-product.services';
import { ClientService } from '../../../core/services/client.services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SaleService } from '../../../core/services/sale.services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oil',
  templateUrl: './oil.component.html',
  styleUrls: ['./oil.component.css']
})
export class OilComponent implements OnInit {
  saleForm: FormGroup;
  type: any;
  capacity: any;
  unit: any;
  endProductList: any[] = [];
  clients: any[] = [];
  packingCapaciyValue: any;
  masterCartoonValue: any;
  totalDoxens: any;
  packingTypeQuantity: any;
  totalQuantityUnit: any;
  currencyValue: any;

  totalQuantityLiters: any;
  totalQuantityKG: any;
  userID: any;
  saleID: any;
  buttonText: Boolean;
  saleDetail: any;
  updateFields: Boolean = false;
  createFields: Boolean = false;
   

  constructor(private endProductService: EndProductService,
    private clientService: ClientService, private fb: FormBuilder,
    private saleService: SaleService,
    private toast: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.initForm();
    this.endProduct()
    this.client();
    this.packingCapacity();
    this.packingType();
    this.packingUnit();
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.route.paramMap.subscribe((params) => {
      if (this.router.url.includes('update')) {
          this.updateFields = true;
          this.createFields = false;
          this.updateFlowInit(params);
      }
      else {
        this.createFields = true;
      }
  });
  }

      /**
     * Update flow init
     * @param params
     */
    updateFlowInit(params: any) {
      if (params.has('id')) {
          this.saleID = params.get('id');
          this.viewsale();
          this.buttonText = true;
      } else {
          this.buttonText = false;
          this.toast.pop('error', 'Opps!', 'Invalid request params');
          this.router.navigate(['/dashboard/sale']);
      }
  }

  viewsale() {
    this.saleService.viewFinalSale(this.saleID).subscribe((response) => {
        this.saleDetail = response;
        this.preFilledForm(this.saleDetail);
    });
}


  initForm() {
    this.saleForm = this.fb.group({
      id: '',
      masterCartoons: ['', [Validators.required]],
      packingType: [null, [Validators.required]],
      packingCapacity: [null, [Validators.required]],
      packingUnit: [null, [Validators.required]],
      dozenBoxes: [''],
      packingTypeQuanitity: [],
      totalQuantityinPackingUnit: [],
      totalQuantityinLiters: [],
      price: ['', [Validators.required]],
      totalQuantityinKg: [],
      productId: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
    });
  }

  packingType() {
    this.type = [
      {
        id: 1,
        value: 'Bottle'
      }
    ]
  }

  packingCapacity() {
    this.capacity = [
      {
        id: 1,
        value: 30
      },
      {
        id: 2,
        value: 60
      },
      {
        id: 3,
        value: 120
      }
    ]
  }

  packingUnit() {
    this.unit = [
      {
        id: 1,
        value: 'ML'
      }
    ]
  }


  endProduct() {
    this.endProductService.getEndProducts().subscribe((response) => {
      this.endProductList = response.results;
    });
  }

  currencyType($event: any){
      this.currencyValue = $event.currencyType;
  }

  client() {
    this.clientService.getClient().subscribe((response) => {
      this.clients = response.results;
    });
  }

  onChangePackingCapacity($event: any) {
    this.packingCapaciyValue = $event.value;
    this.totalDozens()
  }

  onChangeMasterCartoon($event: any) {
    this.masterCartoonValue = $event.srcElement.value;
    this.totalDozens()
  }

  totalDozens() {
    if (this.packingCapaciyValue === 30) {
      this.totalDoxens = +this.masterCartoonValue * 8
    }
    else if (this.packingCapaciyValue === 60) {
      this.totalDoxens = this.masterCartoonValue * 6

    }
    else if (this.packingCapaciyValue === 120) {
      this.totalDoxens = this.masterCartoonValue * 4

    }
    this.totalPackingTypeQuantity();

  }

  totalPackingTypeQuantity() {
    this.packingTypeQuantity = this.totalDoxens * 12;
    this.totalQuantityInPackingUnit();
  }

  totalQuantityInPackingUnit() {
    this.totalQuantityUnit = this.packingTypeQuantity * this.packingCapaciyValue;
    this.totalQuantityInPackingLiters();
  }

  totalQuantityInPackingLiters() {
    this.totalQuantityLiters = this.totalQuantityUnit * 0.001;
    this.totalQuantityInPackingKG();
  }

  totalQuantityInPackingKG() {
    this.totalQuantityKG = this.totalQuantityLiters * 1.1;
  }

  onSubmit() {
    const data = this.saleForm.value;
    data.user = this.userID.user_id;
    data.packingTypeQuanitity = this.packingTypeQuantity;
    data.dozenBoxes = this.totalDoxens;
    data.totalQuantityinKg = this.totalQuantityKG;
    data.totalQuantityinLiters = this.totalQuantityLiters;
    data.totalQuantityinPackingUnit = this.totalQuantityUnit;
    data.catagory = "Oil";
    if (this.saleDetail !== undefined) {
      this.saleService.updateFinalSale(data, this.saleDetail.id).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Oil has been Updated.');
        this.callCompleted();
      });
    }
    else {
      this.saleService.storeFinalSale(data).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Oil Sale has been Created.');
        this.callCompleted();
      });
    }
  }


  public findInvalidControls() {
    const invalid = [];
    const controls = this.saleForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
            console.log(invalid);
        }
    }
    return invalid;
}

  callCompleted() {
    this.saleForm.reset();
    this.router.navigate(['/sale']);

  }

  preFilledForm(saleDetail: any) {
      this.saleForm.get('masterCartoons').setValue(saleDetail.masterCartoons);
      this.saleForm.get('dozenBoxes').setValue(saleDetail.dozenBoxes);
      this.saleForm.get('packingCapacity').setValue(saleDetail.packingCapacity);
      this.saleForm.get('packingType').setValue(saleDetail.packingType);
      this.saleForm.get('packingTypeQuanitity').setValue(saleDetail.packingTypeQuanitity);
      this.saleForm.get('packingUnit').setValue(saleDetail.packingUnit);
      this.saleForm.get('price').setValue(saleDetail.price);
      this.saleForm.get('productId').setValue(saleDetail.productId);
      this.saleForm.get('totalQuantityinKg').setValue(saleDetail.totalQuantityinKg);
      this.saleForm.get('totalQuantityinLiters').setValue(saleDetail.totalQuantityinLiters);
      this.saleForm.get('totalQuantityinPackingUnit').setValue(saleDetail.totalQuantityinPackingUnit);
      this.saleForm.get('customerId').setValue(saleDetail.customerId);

  }

  get productId() {
    return this.saleForm.get('productId');
  }
  get customerId() {
    return this.saleForm.get('customerId');
  } 
   get masterCartoons() {
    return this.saleForm.get('masterCartoons');
  }
  get price() {
    return this.saleForm.get('price');
  } 
  get packingUnits() {
    return this.saleForm.get('packingUnit');
  }
  get packingTypes() {
    return this.saleForm.get('packingType');
  }
  get packingCapacitys(){
    return this.saleForm.get('packingCapacity')
  }
}
