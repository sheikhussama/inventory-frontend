import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../core/services/sale.services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listing-sale',
  templateUrl: './listing-sale.component.html',
  styleUrls: ['./listing-sale.component.css']
})
export class ListingSaleComponent implements OnInit {

  sale: any[] = []; 
  config: any;

  constructor(private router: Router,
    private toast: ToasterService, 
    private saleService: SaleService) {}

  ngOnInit() {
    this.getsale();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  getsale() {
      this.saleService.getFinalSale().subscribe((response) => {
        this.sale = response.results;
      });
    }
    pageChanged(event:any){
      this.config.currentPage = event;
    }
    
    updateSale(sale: any){
      this.router.navigate(['/sale/update', sale.id]);
    }
    
    deleteSale(sale: any) {
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
              this.saleService.deleteFinalSale(sale.id)
              .subscribe(
                (response: any) => {
                  const index = this.sale.indexOf(sale, 0);
                  if (index > -1) {
                    this.sale.splice(index, 1);
                    this.getsale();
                    Swal.fire(
                      'Sale is Deleted!',
                      'success'
                    )
                  }
                });
          } else {
            Swal.fire('Your Sale is safe!');
          }
        });
    }

}
