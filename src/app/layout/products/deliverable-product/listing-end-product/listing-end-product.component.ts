import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EndProductService } from '../../../../core/services/end-product.services';
import Swal from 'sweetalert2'

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
    Swal.fire({
      title: '<i class="fa fa-trash" aria-hidden="true"></i>',
      text: 'Are you sure you want to delete?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.value) {
            this.endProductService.deleteEndProducts(product.id)
            .subscribe(
              (response: any) => {
                const index = this.endProduct.indexOf(product, 0);
                if (index > -1) {
                  this.endProduct.splice(index, 1);
                  this.getEndProduct();
                  Swal.fire(
                    'Deliverable Product is Deleted!',
                    'success'
                  )
                }
              });
        } else {
          Swal.fire('Your Deliverable Product is safe!');
        }
      });
  }
}
