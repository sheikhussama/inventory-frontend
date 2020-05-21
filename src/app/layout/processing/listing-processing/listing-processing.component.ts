import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../core/services/sale.services';

@Component({
  selector: 'app-listing-processing',
  templateUrl: './listing-processing.component.html',
  styleUrls: ['./listing-processing.component.css']
})
export class ListingProcessingComponent implements OnInit {

  sale: any[] = [];

  constructor(private router: Router,
    private toast: ToasterService,
    private saleService: SaleService) { }

  ngOnInit() {
    this.getsale();
  }

  getsale() {
    this.saleService.getFinalSale().subscribe((response) => {
      this.sale = response.results;
    });
  }

  viewProcessingDetail(id: any){
    this.router.navigate(['/processing/detail', id]);

  }
}
