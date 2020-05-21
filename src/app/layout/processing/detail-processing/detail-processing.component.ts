import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EndProductService } from '../../../core/services/end-product.services';
import { RawMaterialService } from '../../../core/services/materials.services';
import { SaleService } from '../../../core/services/sale.services';
import { ProcessingService } from '../../../core/services/processing.service';

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
  userID: any;
  unit: any;

  constructor(
    private toast: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private saleService: SaleService,
    private endProductService: EndProductService,
    private materialService: RawMaterialService,
    private processingService: ProcessingService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEndProduct();
    this.unitBased();
    this.getMaterial();
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.route.paramMap.subscribe((params) => {
      if (this.router.url.includes('detail')) {
        if (params.has('id')) {
          this.processingID = params.get('id');
          this.viewProcessing();

        } else {
          this.toast.pop('error', 'Opps!', 'Invalid request params');
          this.router.navigate(['/dashboard/processing']);
        }
      }
    });
  }


  initForm() {
    this.processingForm = this.fb.group({
      raw: this.fb.array([this.rawItem()]),
      recipie: this.fb.array([this.receipeItem()])
    });
  }

  viewProcessing() {
    this.saleService.viewFinalSale(this.processingID).subscribe((response) => {
      this.processing = response;
    });
  }

  onSubmit() {
    const data = this.processingForm.value;
    console.log(data);
    this.processingService.storeRecipe(data.recipie).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Recipe has been Created.');
      this.callCompleted();
    });
    this.processingService.storeRaw(data.raw).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Raw has been Created.');
      this.callCompleted();
    });
  }

  callCompleted(){
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

  rawItem(): FormGroup {
    return this.fb.group({
      rawQuantity: ['', Validators.required],
      saleId: [ this.processingID, Validators.required],
      ProductId: [null, Validators.required],
      user: this.userID
    });
  }

  receipeItem(): FormGroup {
    return this.fb.group({
      recipieQuantity: [null, Validators.required],
      unit: null,
      saleId: [ this.processingID, Validators.required],
      ProductId: [null, Validators.required],
      user: this.userID
    });
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
    this.endProductService.getEndProducts().subscribe((response) => {
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

}
