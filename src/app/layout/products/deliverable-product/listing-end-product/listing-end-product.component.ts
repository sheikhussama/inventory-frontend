import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EndProductService } from '../../../../core/services/end-product.services';

@Component({
  selector: 'app-listing-end-product',
  templateUrl: './listing-end-product.component.html',
  styleUrls: ['./listing-end-product.component.css']
})
export class ListingEndProductComponent implements OnInit {

  endProduct: any[] = []; 
  config: any;

  constructor(private router: Router,
    private toast: ToasterService, private endProductService: EndProductService) { }

  ngOnInit() {
    this.getEndProduct();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
   }


  getEndProduct() {
    this.endProductService.getEndProducts().subscribe((response) => {
      this.endProduct = response.results;
      });
  }  

  updateProduct(product: any){
    this.router.navigate(['/products/endProduct/update', product.id]);
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }
  deleteProduct(product: any) {
    this.endProductService.deleteEndProducts(product.id)
      .subscribe(
        (response: any) => {
          const index = this.endProduct.indexOf(product, 0);
          if (index > -1) {
            this.endProduct.splice(index, 1);
            this.getEndProduct();
            this.toast.pop('success', 'Your Deliverable Product delete is not recover');
          }
          else {
            this.toast.pop('error', 'Your Deliverable Product is safe!');
          }
        });
  }
}
