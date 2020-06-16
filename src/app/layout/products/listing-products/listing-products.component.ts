import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/products.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

declare const $: any;

@Component({
  selector: 'app-listing-products',
  templateUrl: './listing-products.component.html',
  styleUrls: ['./listing-products.component.css']
})
export class ListingProductsComponent implements OnInit {
    
  products: any[] = []; 
  config: any;

  constructor(private router: Router,
    private toast: ToasterService, private productService: ProductService) { }

  ngOnInit() {
    this.getProduct();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
   }


  getProduct() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.results;
      // $('#spin').hide();
    });
  }  

  updateProduct(product: any){
    this.router.navigate(['/products/update', product.id]);
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }

  deleteProduct(product: any) {
    this.productService.deleteProducts(product.id)
      .subscribe(
        (response: any) => {
          const index = this.products.indexOf(product, 0);
          if (index > -1) {
            this.products.splice(index, 1);
            this.getProduct();
            this.toast.pop('success', 'Your Product delete is not recover');
          }
          else {
            this.toast.pop('error', 'Your Product is safe!');
          }
        });
  }

}
