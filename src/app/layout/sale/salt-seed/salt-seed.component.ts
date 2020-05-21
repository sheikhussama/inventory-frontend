import { Component, OnInit, Input } from '@angular/core';
import { EndProductService } from '../../../core/services/end-product.services';
import { ClientService } from '../../../core/services/client.services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SaleService } from '../../../core/services/sale.services';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-salt-seed',
  templateUrl: './salt-seed.component.html',
  styleUrls: ['./salt-seed.component.css']
})
export class SaltSeedComponent implements OnInit {
  
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
  totalQuantityLiters: any;
  totalQuantityKG: any;
  packingOfType :any;
  userID: any;
  
  @Input() saleDetail: any;
  @Input('buttonText') buttonText: Boolean;

  constructor(private endProductService: EndProductService,
    private clientService: ClientService,
    private saleService: SaleService,
    private toast: ToasterService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.endProduct()
    this.client();
    this.packingCapacity();
    this.packingType();
    this.packingUnit();
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    if(this.saleDetail !== undefined || this.buttonText) {
      this.preFilledForm(this.saleDetail);

    }
  }


  initForm() {
    this.saleForm = this.fb.group({
      id: '',
      masterCartoons: ['', [Validators.required]],
      packingType: [null, [Validators.required]],
      packingCapacity: [null, [Validators.required]],
      packingUnit: [null, [Validators.required]],
      packingTypeQuanitity: ['', [Validators.required]],
      totalQuantityinPackingUnit: ['', [Validators.required]],
      price: ['', [Validators.required]],
      totalQuantityinKg: ['', [Validators.required]],
      productId: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
    });
  }

  packingType() {
    this.type = [
      {
        id: 1,
        value: 'Pouch'
      },
      {
        id: 2,
        value: 'Jars'
      }
    ]
  }

  packingCapacity() {
    this.capacity = [
      {
        id: 1,
        value: 200
      },
      {
        id: 2,
        value: 400
      }
    ]
  }

  packingUnit() {
    this.unit = [
      {
        id: 1,
        value: 'GMS'
      }
    ]
  }


  endProduct() {
    this.endProductService.getEndProducts().subscribe((response) => {
      this.endProductList = response.results;
    });
  }

  client() {
    this.clientService.getClient().subscribe((response) => {
      this.clients = response.results;
    });
  }

  onChangePackingType($event: any) {
    this.packingOfType = $event.value;
  }

  onChangePackingCapacity($event: any) {
    this.packingCapaciyValue = $event.value;
    this.total();
  }

  onChangeMasterCartoon($event: any) {
    this.masterCartoonValue = $event.srcElement.value;
    this.total()
  }

  total() {
    if (this.packingCapaciyValue === 200) {
      this.packingTypeQuantity = this.masterCartoonValue * 42;
      this.totalQuantityUnit = this.packingTypeQuantity * this.packingCapaciyValue;
      this.totalQuantityKG = this.totalQuantityUnit * 0.001;
    }
    else if (this.packingCapaciyValue === 400) {
      this.packingTypeQuantity = this.masterCartoonValue * 30;
      this.totalQuantityUnit = this.packingTypeQuantity * this.packingCapaciyValue;
      this.totalQuantityKG = this.totalQuantityUnit * 0.001;
    }
  }


  onSubmit() {
    const data = this.saleForm.value;
    data.user = this.userID.user_id;
    console.log(data);
    data.packingTypeQuanitity = this.packingTypeQuantity;
    data.totalQuantityinKg = this.totalQuantityKG;
    data.totalQuantityinPackingUnit = this.totalQuantityUnit;
    if (this.saleDetail !== undefined) {
      this.saleService.updateFinalSale(data, this.saleDetail.id).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Salt N Seed Sale has been Updated.');
        this.callCompleted();
      });
    } 
    else {
      this.saleService.storeFinalSale(data).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Salt N Seed Sale has been Created.');
        this.callCompleted();
      });
    }
  }

  callCompleted() {
    this.saleForm.reset();
  }

  preFilledForm(saleDetail: any) {
    this.saleForm.get('masterCartoons').setValue(saleDetail.masterCartoons);
    this.saleForm.get('packingCapacity').setValue(saleDetail.packingCapacity);
    this.saleForm.get('packingType').setValue(saleDetail.packingType);
    this.saleForm.get('packingTypeQuanitity').setValue(saleDetail.packingTypeQuanitity);
    this.saleForm.get('packingUnit').setValue(saleDetail.packingUnit);
    this.saleForm.get('price').setValue(saleDetail.price);
    this.saleForm.get('productId').setValue(saleDetail.productId);
    this.saleForm.get('totalQuantityinKg').setValue(saleDetail.totalQuantityinKg);
    this.saleForm.get('totalQuantityinPackingUnit').setValue(saleDetail.totalQuantityinPackingUnit);
    this.saleForm.get('customerId').setValue(saleDetail.customerId);
 }
}
