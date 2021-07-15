import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { FinishGoodsService } from '../../../../core/services/finish-goods.services';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-listing-finish',
  templateUrl: './listing-finish.component.html',
  styleUrls: ['./listing-finish.component.css']
})
export class ListingFinishComponent implements OnInit {

    
  finishGoods: any[] = []; 
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(private router: Router,
    private toast: ToasterService, 
    private finishGoodsService: FinishGoodsService) {}

  ngOnInit() {
    this.getfinishGoods();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;
  }

  getfinishGoods() {
      this.finishGoodsService.getfinishGoods().subscribe((response) => {
        this.finishGoods = response;
      });
    }

    pageChanged(event:any){
      this.config.currentPage = event;
    }
    updatefinishGoods(finishGoods: any){
      this.router.navigate(['/purchase/finishGoods/update', finishGoods.id]);
    }

    deletefinishGoods(finishGoods: any) {
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
              this.finishGoodsService.deletefinishGoods(finishGoods.id)
              .subscribe(
                (response: any) => {
                  const index = this.finishGoods.indexOf(finishGoods, 0);
                  if (index > -1) {
                    this.finishGoods.splice(index, 1);
                  this.getfinishGoods();
                    Swal.fire(
                      'FinishGoods is Deleted!',
                      'success'
                    )
                  }
                });
          } else {
            Swal.fire('Your FinishGoods is safe!');
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
      pdf.text('Finish Goods Purchase Report', 350, 80);
      pdf.text('Date: ' + myFormattedDate, 349, 60);
    
      const imgUrl = this.imageUrl.imagebase64;
      var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
      var columns = [
        res.columns[0], res.columns[1],res.columns[2],
        res.columns[3], res.columns[4],res.columns[5],
        res.columns[6], res.columns[7],res.columns[8]
      ];
      pdf.addImage(imgUrl, "png", 20, 20, 70, 70);
      pdf.autoTable(columns, res.data,{
        theme: 'grid',
        tableWidth: 750,
        margin: { top: 100 }
      });
      pdf.save('FinishGoodsPurchaseReport-' + myFormattedDate +'.pdf');
    }
}
