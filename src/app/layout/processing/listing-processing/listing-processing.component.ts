import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { SaleService } from '../../../core/services/sale.services';
import { logoUrl } from '../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listing-processing',
  templateUrl: './listing-processing.component.html',
  styleUrls: ['./listing-processing.component.css']
})
export class ListingProcessingComponent implements OnInit {

  sale: any[] = [];
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(private router: Router,
    private toast: ToasterService,
    private saleService: SaleService) { }

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

  viewProcessingDetail(id: any){
    this.router.navigate(['/processing/detail', id]);

  }
  
  showRawRecipe(id: any){
    this.router.navigate(['/processing/show', id]);
  }
  
  updateRawRecipe(id: any){
    this.router.navigate(['/processing/update', id]);
  }

  genReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Processing Report', 350, 80);
  
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
    pdf.save('ProcessingReport-' + myFormattedDate +'.pdf');
  }
}
