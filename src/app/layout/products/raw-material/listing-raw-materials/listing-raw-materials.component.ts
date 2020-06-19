import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../../../../core/services/materials.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listing-raw-materials',
  templateUrl: './listing-raw-materials.component.html',
  styleUrls: ['./listing-raw-materials.component.css']
})
export class ListingRawMaterialsComponent implements OnInit {
   
   rawMaterial: any[] = [];
   config: any;

  constructor(private router: Router,
    private materialService: RawMaterialService,
    private toast: ToasterService) { }

  ngOnInit(){
    this.getMaterial();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
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
          Swal.fire('Your Raw Material is safe!');
        }
      });
  }
}
