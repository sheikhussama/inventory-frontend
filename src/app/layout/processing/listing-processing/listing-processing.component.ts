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
  config: any;

  constructor(private router: Router,
    private toast: ToasterService,
    private saleService: SaleService) { }

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

  viewProcessingDetail(id: any){
    this.router.navigate(['/processing/detail', id]);

  }
  
  showRawRecipe(id: any){
    this.router.navigate(['/processing/show', id]);
  }
  
  updateRawRecipe(id: any){
    this.router.navigate(['/processing/update', id]);
  }
}
