import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../../core/services/sale.services';
import { ProcessingService } from '../../../../core/services/processing.service';
import { RawMaterialService } from '../../../../core/services/materials.services';

@Component({
  selector: 'app-raw-filter',
  templateUrl: './raw-filter.component.html',
  styleUrls: ['./raw-filter.component.css']
})
export class RawFilterComponent implements OnInit {

  finishGoodForm: FormGroup;
  rawMat: any[] = [];
  finishGoodDetail: any;
  sale: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private toast: ToasterService,
    private saleService: SaleService,
    private materialService: RawMaterialService,
    private processingService: ProcessingService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getMaterial();
    this.getsale();
  }

  initForm() {
    this.finishGoodForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      saleId: ['', [Validators.required]],
    });
  }

  getMaterial() {
    this.materialService.getMaterial().subscribe((response) => {
      this.rawMat = response.results;
    });
  }

  getsale() {
    this.saleService.getFinalSale().subscribe((response) => {
      this.sale = response.results;
    });
  }
 

  onSubmit() {
    const data = this.finishGoodForm.value;
    this.processingService.filterRawFinishGoods(data).subscribe((response: any) => {
      this.finishGoodDetail = response;
      console.log(this.finishGoodDetail)
      this.toast.pop('success', 'Success!', 'Finish Good History Search is Completed.');
      this.callCompleted();
    },
      (error => {
        if (error.status === 400) {
          this.toast.pop('error', 'Error!', 'Record Not Found');
        }
      }));


  }
  callCompleted() {
    this.finishGoodForm.reset();
  }
}
