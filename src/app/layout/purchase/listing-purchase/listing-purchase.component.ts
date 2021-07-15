import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { PurchaseService } from '../../../core/services/purchase.services';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { logoUrl } from '../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare const $: any

@Component({
  selector: 'app-listing-purchase',
  templateUrl: './listing-purchase.component.html',
  styleUrls: ['./listing-purchase.component.css']
})
export class ListingPurchaseComponent implements OnInit {
   
  purchase: any[] = []; 
  config: any;
  imageUrl: any;
  @Input() scale = 0.5

  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(private router: Router,
    private toast: ToasterService, 
    private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getPurchase();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;

  }

  getPurchase() {
      this.purchaseService.getPurchase().subscribe((response) => {
        this.purchase = response;
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


    genReport() {
      var pdf = new jsPDF('l', 'pt', 'a4');
      let pipe = new DatePipe('en-US'); // Use your own locale
      const now = Date.now();
      const myFormattedDate = pipe.transform(now, 'short');
      pdf.cellInitialize();
      pdf.setFontSize(20);
      pdf.text('Raw Material Purchase Report', 350, 80);
      pdf.text('Date: ' + myFormattedDate, 349, 60);
    
      const imgUrl = this.imageUrl.imagebase64;
      var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
      var columns = [
        res.columns[0], res.columns[1],res.columns[2],
        res.columns[3], res.columns[4],res.columns[5],
        res.columns[6], res.columns[7],res.columns[8],
        res.columns[9], res.columns[10],res.columns[11],
      ];
      pdf.addImage(imgUrl, "png", 20, 20, 70, 70);
      pdf.autoTable(columns, res.data,{
        theme: 'grid',
        tableWidth: 750,
        margin: { top: 100 }
      });
      pdf.save('RawMaterialPurchaseReport-' + myFormattedDate +'.pdf');
    }

}
