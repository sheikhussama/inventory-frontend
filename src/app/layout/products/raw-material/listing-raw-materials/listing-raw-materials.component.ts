import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RawMaterialService } from '../../../../core/services/materials.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-listing-raw-materials',
  templateUrl: './listing-raw-materials.component.html',
  styleUrls: ['./listing-raw-materials.component.css']
})
export class ListingRawMaterialsComponent implements OnInit {
   
   rawMaterial: any[] = [];
   config: any;
   imageUrl: any;
   @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
   
  constructor(private router: Router,
    private materialService: RawMaterialService,
    private toast: ToasterService) { }

  ngOnInit(){
    this.getMaterial();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;
  }

  getMaterial() {
    this.materialService.getMaterial().subscribe((response) => {
      this.rawMaterial = response.results;
    });
  }  

  updateProduct(raw: any){
    this.router.navigate(['/products/raw/update', raw.id]);
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }


  deleteMaterial(material: any) {
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
            this.materialService.deleteMaterial(material.id)
            .subscribe(
              (response: any) => {
                const index = this.rawMaterial.indexOf(material, 0);
                if (index > -1) {
                  this.rawMaterial.splice(index, 1);
                  this.getMaterial();
                  Swal.fire(
                    'Raw Material is Deleted!',
                    'success'
                  )
                }
              });
        } else {
          Swal.fire('Your Finish Goods is safe!');
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
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Finish Goods Report', 350, 80);
  
    const imgUrl = this.imageUrl.imagebase64;
    // $(".text-right").hide();
    pdf.addImage(imgUrl, "png", 30, 30, 70, 70);
    pdf.autoTable({
      html: '#pdftable',
      theme: 'grid',
      tableWidth: 800,
      margin: { top: 100 },
    }
      );
    pdf.save('FinishGoodsReport-' + myFormattedDate +'.pdf');
  }
}
