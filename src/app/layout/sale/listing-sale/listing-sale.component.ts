import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../core/services/sale.services';

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
      this.saleService.deleteFinalSale(sale.id)
        .subscribe(
          (response: any) => {
            const index = this.sale.indexOf(sale, 0);
            if (index > -1) {
              this.sale.splice(index, 1);
              this.getsale();
              this.toast.pop('success', 'Your Sale delete is not recover');
            }
            else {
              this.toast.pop('error', 'Your Sale is safe!');
            }
          });
    }

}
