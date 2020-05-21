import { Component, OnInit } from '@angular/core';
import { RawMaterialService } from '../../../../core/services/materials.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-listing-raw-materials',
  templateUrl: './listing-raw-materials.component.html',
  styleUrls: ['./listing-raw-materials.component.css']
})
export class ListingRawMaterialsComponent implements OnInit {
   
   rawMaterial: any[] = [];

  constructor(private router: Router,
    private materialService: RawMaterialService,
    private toast: ToasterService) { }

  ngOnInit(){
    this.getMaterial();
  }

  getMaterial() {
    this.materialService.getMaterial().subscribe((response) => {
      this.rawMaterial = response.results;
    });
  }  

  updateProduct(raw: any){
    this.router.navigate(['/products/raw/update', raw.id]);
  }

  deleteMaterial(material: any) {
    this.materialService.deleteMaterial(material.id)
      .subscribe(
        (response: any) => {
          const index = this.rawMaterial.indexOf(material, 0);
          if (index > -1) {
            this.rawMaterial.splice(index, 1);
            this.getMaterial();
            this.toast.pop('success', 'Your Material delete is not recover');
          }
          else {
            this.toast.pop('error', 'Your Material is safe!');
          }
        });
  }

}
