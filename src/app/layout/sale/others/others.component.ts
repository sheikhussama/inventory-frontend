import { Component, OnInit, Input } from '@angular/core';
import { EndProductService } from '../../../core/services/end-product.services';
import { ClientService } from '../../../core/services/client.services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SaleService } from '../../../core/services/sale.services';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  type: any;
  capacity: any;
  unit: any;
  endProductList: any[] = [];
  clients: any[] = [];
  userID: any;
  saleForm: FormGroup;
  @Input() saleDetail: any;
  @Input('buttonText') buttonText: Boolean;

  constructor(private endProductService: EndProductService,
    private clientService: ClientService, private fb: FormBuilder,
    private saleService: SaleService,
    private toast: ToasterService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.endProduct()
    this.client();
    this.packingCapacity();
    this.packingType();
    this.packingUnit();
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    if (this.saleDetail !== undefined || this.buttonText) {
      this.preFilledForm(this.saleDetail);

    }
  }

  packingType() {
    this.type = [
      {
        id: 1,
        value: 'Bottle'
      },
      {
        id: 2,
        value: 'Pouch'
      },
      {
        id: 2,
        value: 'Jar'
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
      },
      {
        id: 4,
        value: 200
      },
      {
        id: 5,
        value: 400
      }
    ]
  }

  packingUnit() {
    this.unit = [
      {
        id: 1,
        value: 'ML'
      },
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

  initForm() {
    this.saleForm = this.fb.group({
      id: '',
      masterCartoons: ['', [Validators.required]],
      packingType: [null, [Validators.required]],
      packingCapacity: [null, [Validators.required]],
      packingUnit: [null, [Validators.required]],
      dozenBoxes: [, [Validators.required]],
      packingTypeQuanitity: [, [Validators.required]],
      totalQuantityinPackingUnit: [, [Validators.required]],
      totalQuantityinLiters: [, [Validators.required]],
      price: ['', [Validators.required]],
      totalQuantityinKg: [, [Validators.required]],
      productId: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
    });
  }



  onSubmit() {
    const data = this.saleForm.value;
    data.user = this.userID.user_id;

    if (this.saleDetail !== undefined) {
      this.saleService.updateFinalSale(data, this.saleDetail.id).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Others has been Updated.');
        this.callCompleted();
      });
    }
    else {
      this.saleService.storeFinalSale(data).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Others Sale has been Created.');
        this.callCompleted();
      });
    }
  }

  callCompleted() {
    this.saleForm.reset();
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

}
