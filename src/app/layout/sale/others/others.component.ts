import { Component, OnInit, Input } from "@angular/core";
import { EndProductService } from "../../../core/services/end-product.services";
import { ClientService } from "../../../core/services/client.services";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SaleService } from "../../../core/services/sale.services";
import { ToasterService } from "angular2-toaster";
import { Router, ActivatedRoute } from "@angular/router";

declare const $: any;

@Component({
  selector: "app-others",
  templateUrl: "./others.component.html",
  styleUrls: ["./others.component.css"],
})
export class OthersComponent implements OnInit {
  type: any;
  capacity: any;
  unit: any;
  endProductList: any[] = [];
  clients: any[] = [];
  userID: any;
  saleForm: FormGroup;
  currencyValue: any;
  saleID: any;
  buttonText: Boolean;
  saleDetail: any;

  constructor(
    private endProductService: EndProductService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private saleService: SaleService,
    private toast: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.endProduct();
    this.client();
    this.packingCapacity();
    this.packingType();
    this.packingUnit();
    this.userID = JSON.parse(localStorage.getItem("profileDetail"));
    this.route.paramMap.subscribe((params) => {
      if (this.router.url.includes("update")) {
        this.updateFlowInit(params);
      }
    });
  }

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has("id")) {
      this.saleID = params.get("id");
      this.viewsale();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop("error", "Opps!", "Invalid request params");
      this.router.navigate(["/dashboard/sale"]);
    }
  }

  viewsale() {
    this.saleService.viewFinalSale(this.saleID).subscribe((response) => {
      this.saleDetail = response;
      this.preFilledForm(this.saleDetail);
    });
  }

  packingType() {
    this.type = [
      {
        id: 1,
        value: "Bottle",
      },
      {
        id: 2,
        value: "Pouch",
      },
      {
        id: 2,
        value: "Jar",
      },
    ];
  }

  packingCapacity() {
    this.capacity = [
      {
        id: 1,
        value: 30,
      },
      {
        id: 2,
        value: 60,
      },
      {
        id: 3,
        value: 120,
      },
      {
        id: 4,
        value: 200,
      },
      {
        id: 5,
        value: 400,
      },
    ];
  }

  currencyType($event: any) {
    this.currencyValue = $event.currencyType;
  }
  packingUnit() {
    this.unit = [
      {
        id: 1,
        value: "ML",
      },
      {
        id: 1,
        value: "GMS",
      },
    ];
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
      id: "",
      masterCartoons: ["", [Validators.required]],
      packingType: [null, [Validators.required]],
      packingCapacity: [null, [Validators.required]],
      packingUnit: [null, [Validators.required]],
      dozenBoxes: [, [Validators.required]],
      packingTypeQuanitity: [, [Validators.required]],
      totalQuantityinPackingUnit: [, [Validators.required]],
      totalQuantityinLiters: [, [Validators.required]],
      price: ["", [Validators.required]],
      totalQuantityinKg: [, [Validators.required]],
      productId: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
    });
  }

  onSubmit() {
    const data = this.saleForm.value;
    data.user = this.userID.user_id;
    data.catagory = "Others";

    if (this.saleDetail !== undefined) {
      this.saleService
        .updateFinalSale(data, this.saleDetail.id)
        .subscribe((response: any) => {
          this.toast.pop("success", "Success!", "Others has been Updated.");
          this.callCompleted();
        });
    } else {
      this.saleService.storeFinalSale(data).subscribe((response: any) => {
        this.toast.pop("success", "Success!", "Others Sale has been Created.");
        this.callCompleted();
      });
    }
  }

  callCompleted() {
    this.saleForm.reset();
    this.router.navigate(['/sale']);
  }

  preFilledForm(saleDetail: any) {
    if (saleDetail !== undefined) {
      this.saleForm.get("masterCartoons").setValue(saleDetail.masterCartoons);
      this.saleForm.get("dozenBoxes").setValue(saleDetail.dozenBoxes);
      this.saleForm.get("packingCapacity").setValue(saleDetail.packingCapacity);
      this.saleForm.get("packingType").setValue(saleDetail.packingType);
      this.saleForm
        .get("packingTypeQuanitity")
        .setValue(saleDetail.packingTypeQuanitity);
      this.saleForm.get("packingUnit").setValue(saleDetail.packingUnit);
      this.saleForm.get("price").setValue(saleDetail.price);
      this.saleForm.get("productId").setValue(saleDetail.productId);
      this.saleForm
        .get("totalQuantityinKg")
        .setValue(saleDetail.totalQuantityinKg);
      this.saleForm
        .get("totalQuantityinLiters")
        .setValue(saleDetail.totalQuantityinLiters);
      this.saleForm
        .get("totalQuantityinPackingUnit")
        .setValue(saleDetail.totalQuantityinPackingUnit);
      this.saleForm.get("customerId").setValue(saleDetail.customerId);
    }
  }
}
