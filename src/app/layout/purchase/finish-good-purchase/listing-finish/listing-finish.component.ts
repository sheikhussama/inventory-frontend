import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { FinishGoodsService } from '../../../../core/services/finish-goods.services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listing-finish',
  templateUrl: './listing-finish.component.html',
  styleUrls: ['./listing-finish.component.css']
})
export class ListingFinishComponent implements OnInit {

    
  finishGoods: any[] = []; 
  config: any;

  constructor(private router: Router,
    private toast: ToasterService, 
    private finishGoodsService: FinishGoodsService) {}

  ngOnInit() {
    this.getfinishGoods();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  getfinishGoods() {
      this.finishGoodsService.getfinishGoods().subscribe((response) => {
        this.finishGoods = response.results;
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

}
