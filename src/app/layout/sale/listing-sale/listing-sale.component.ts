import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../core/services/sale.services';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { logoUrl } from '../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-listing-sale',
  templateUrl: './listing-sale.component.html',
  styleUrls: ['./listing-sale.component.css']
})
export class ListingSaleComponent implements OnInit {

  sale: any[] = []; 
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(private router: Router,
    private toast: ToasterService, 
    private saleService: SaleService) {}

  ngOnInit() {
    this.getsale();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;
  }

  getsale() {
      this.saleService.getFinalSale().subscribe((response) => {
        this.sale = response;
      });
    }
    pageChanged(event:any){
      this.config.currentPage = event;
    }
    
    // updateSale(sale: any, saleCategory: any){
    //   this.router.navigate(['/sale/update/' + saleCategory , sale.id]);
    // }

    updateSale(sale: any, saleCategory: any) {
      Swal.fire({
        title: '<i class="fa fa-pencil" aria-hidden="true"></i>',
        text: 'Are you sure you want to Edit ' + saleCategory + ' Sale ?',
        showCancelButton: true,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Edit it!'
      })
        .then((result) => {
          if (result.value) {
            this.router.navigate(['/sale/update/' + saleCategory , sale.id]);
          } else {
            Swal.fire('Ok Next Time!');
          }
        });
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

    genReport() {
      var pdf = new jsPDF('l', 'pt', 'a4');
      let pipe = new DatePipe('en-US'); // Use your own locale
      const now = Date.now();
      const myFormattedDate = pipe.transform(now, 'short');
      pdf.cellInitialize();
      pdf.setFontSize(20);
      pdf.text('Sale Report', 350, 80);
      pdf.text('Date: ' + myFormattedDate, 349, 60);
    
      const imgUrl = this.imageUrl.imagebase64;
      var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
      var columns = [
        res.columns[0], res.columns[1],res.columns[2],
        res.columns[3], res.columns[4],res.columns[5],
        res.columns[6], res.columns[7],res.columns[8],
        res.columns[9], res.columns[10],res.columns[11],
        res.columns[12], res.columns[13],res.columns[14],
        res.columns[15]
      ];
      pdf.addImage(imgUrl, "png", 20, 20, 70, 70);
      pdf.autoTable(columns, res.data,{
        theme: 'grid',
        tableWidth: 750,
        margin: { top: 100 },
        styles: {
          fontSize: 9,
          font: 'helvetica',
          fontType: 'bold',
          }
      });
      pdf.save('SaleReport-' + myFormattedDate +'.pdf');
    }

}
