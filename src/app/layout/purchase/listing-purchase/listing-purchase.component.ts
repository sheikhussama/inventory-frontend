import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { PurchaseService } from '../../../core/services/purchase.services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listing-purchase',
  templateUrl: './listing-purchase.component.html',
  styleUrls: ['./listing-purchase.component.css']
})
export class ListingPurchaseComponent implements OnInit {
   
  purchase: any[] = []; 
  config: any;

  constructor(private router: Router,
    private toast: ToasterService, 
    private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getPurchase();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  getPurchase() {
      this.purchaseService.getPurchase().subscribe((response) => {
        this.purchase = response.results;
      });
    }
    pageChanged(event:any){
      this.config.currentPage = event;
    }
    
    updatePurchase(purchase: any){
      this.router.navigate(['/purchase/update', purchase.id]);
    }

    deletePurchase(purchase: any) {
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
              this.purchaseService.deletePurchase(purchase.id)
              .subscribe(
                (response: any) => {
                  const index = this.purchase.indexOf(purchase, 0);
                  if (index > -1) {
                    this.purchase.splice(index, 1);
                    this.getPurchase();
                    Swal.fire(
                      'Purchase is Deleted!',
                      'success'
                    )
                  }
                });
          } else {
            Swal.fire('Your Purchase is safe!');
          }
        });
    }

}
