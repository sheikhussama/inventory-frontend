import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../../core/services/sale.services';
import { ProductService } from '../../../../core/services/products.services';
import { ProcessingService } from '../../../../core/services/processing.service';

@Component({
  selector: 'app-recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.css']
})
export class RecipeFilterComponent implements OnInit {

   recipeForm: FormGroup;
   products: any [] = [];
   recipeDetail: any;
   sale: any[] = []; 

   constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private saleService: SaleService,
    private productService: ProductService,
    private processingService: ProcessingService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getProduct(); 
    this.getsale();
  }

  initForm() {
    this.recipeForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      saleId: ['', [Validators.required]],
  });
}

  getProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.results;
    });
  }  

  getsale() {
    this.saleService.getFinalSale().subscribe((response) => {
      this.sale = response.results;
    });
  }

  onSubmit() {
    const data = this.recipeForm.value;  
      this.processingService.filterRaw(data).subscribe((response: any) => {
        this.recipeDetail = response;
        this.toast.pop('success', 'Success!', 'Raw Product History Search is Completed.');
        this.callCompleted();
      },
      (error => {
         if(error.status === 400) {
          this.toast.pop('error', 'Error!', 'Record Not Found');
         }
      }));
  }

  callCompleted() {
    this.recipeForm.reset();
  }
}
