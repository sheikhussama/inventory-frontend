import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../core/services/products.services";

@Component({
  selector: "app-create-products",
  templateUrl: "./create-products.component.html",
  styleUrls: ["./create-products.component.css"],
})
export class CreateProductsComponent implements OnInit {
  type: any;
  unit: any;
  productForm: FormGroup;
  userID: any;
  productID: any;
  productDetail: any;
  buttonText: Boolean;
  bulk: any;
  kg: any;
  calUnit: any;
  total: any;
  totalUnit: any;
  showHide: Boolean;
  flag: Boolean = true;
  unitName: any;
  typeOfProduct: any;

  constructor(
    private fb: FormBuilder,
    private toast: ToasterService,
    private productsService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (this.router.url.includes("update")) {
        this.updateFlowInit(params);
      }
    });
    this.userID = JSON.parse(localStorage.getItem("profileDetail"));
    this.initForm();
    this.typeBased();
    this.unitBased();
  }

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has("id")) {
      this.productID = params.get("id");
      this.viewProduct();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop("error", "Opps!", "Invalid request params");
      this.router.navigate(["/dashboard"]);
    }
  }

  viewProduct() {
    this.productsService.viewProducts(this.productID).subscribe((response) => {
      this.productDetail = response;
      if (this.productDetail.type === "1") {
        this.typeOfProduct = "Drum";
      } else if (this.productDetail.type === "2") {
        this.typeOfProduct = "Bag";
      }
      if (this.productDetail.unit === "Ltr") {
        this.unitName = "Ltr";
      }
      if (this.productDetail.unit === "Gram") {
        this.unitName = "Gram";
      }
      this.preFilledForm(this.productDetail);
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      id: this.productID ? this.productID : "", // to handle update flow only for class.
      productName: ["", [Validators.required]],
      DcNo: ["", [Validators.required]],
      bulkQuantity: ["", [Validators.required]],
      type: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      QuantityInKg: [],
      QuantityInUnit: [],
    });
  }

  bulkQuantitys(event: any) {
    this.bulk = event.srcElement.value;
    this.totalQuantity();
  }
  QuantityInKg(event: any) {
    this.kg = event.srcElement.value;
    this.totalQuantity();
  }

  totalQuantity() {
    if (this.kg !== undefined) {
      this.total = this.bulk * this.kg;
    }
  }
  typelist(event: any) {
    this.typeOfProduct = event.value;
  }

  QuantityUnit(event: any) {
    if (event.value === "LTR") {
      this.totalUnit = this.total * 1.11;
      this.unitName = "LTR";
    }
    if (event.value === "GRM") {
      this.unitName = "GRM";
      this.totalUnit = this.total * 1000;
    }
  }

  onSubmit() {
    const data = this.productForm.value;
    data.QuantityInKg = parseFloat(this.total);
    data.QuantityInUnit = parseFloat(this.totalUnit);
    data.user = this.userID.user_id;

    if (data.id > 0) {
      this.productsService
        .updateProducts(data, data.id)
        .subscribe((response: any) => {
          this.toast.pop("success", "Success!", "Product has been Updated.");
          this.callCompleted();
        });
    } else {
      this.productsService.storeProducts(data).subscribe((response: any) => {
        this.toast.pop("success", "Success!", "Product has been Created.");
        this.callCompleted();
      });
    }
  }

  callCompleted() {
    this.productForm.reset();
    this.router.navigate(["/products"]);
    this.flag = false;
    setTimeout(() => {
      this.flag = true;
    });
  }

  typeBased() {
    this.type = [
      {
        id: "1",
        value: "Drum",
      },
      {
        id: "2",
        value: "Bag",
      },
    ];
  }

  unitBased() {
    this.unit = [
      {
        id: "LTR",
        value: "LTR",
      },
      {
        id: "GRM",
        value: "GRM",
      },
    ];
  }

  preFilledForm(product: any) {
    this.productForm.get("productName").setValue(product.productName);
    this.productForm.get("DcNo").setValue(product.DcNo);
    this.productForm.get("bulkQuantity").setValue(product.bulkQuantity);
    this.productForm.get("type").setValue(product.type);
    this.productForm.get("unit").setValue(product.unit);
    this.productForm.get("QuantityInUnit").setValue(product.QuantityInUnit);
    this.productForm.get("QuantityInKg").setValue(product.QuantityInKg);
    this.total = product.QuantityInKg;
    this.totalUnit =product.QuantityInUnit
  }

  get productName() {
    return this.productForm.get("productName");
  }
  get DcNo() {
    return this.productForm.get("DcNo");
  }
  get bulkQuantity() {
    return this.productForm.get("bulkQuantity");
  }
  get types() {
    return this.productForm.get("type");
  }
  get units() {
    return this.productForm.get("unit");
  }
  get QuantityInUnit() {
    return this.productForm.get("QuantityInUnit");
  }
  get QuantityInKgs() {
    return this.productForm.get("QuantityInKg");
  }
}
