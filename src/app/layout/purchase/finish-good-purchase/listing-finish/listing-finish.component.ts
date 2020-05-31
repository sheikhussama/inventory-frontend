import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { FinishGoodsService } from '../../../../core/services/finish-goods.services';

@Component({
  selector: 'app-listing-finish',
  templateUrl: './listing-finish.component.html',
  styleUrls: ['./listing-finish.component.css']
})
export class ListingFinishComponent implements OnInit {

    
  finishGoods: any[] = []; 

  constructor(private router: Router,
    private toast: ToasterService, 
    private finishGoodsService: FinishGoodsService) {}

  ngOnInit() {
    this.getfinishGoods();
  }

  getfinishGoods() {
      this.finishGoodsService.getfinishGoods().subscribe((response) => {
        this.finishGoods = response.results;
      });
    }

    
    updatefinishGoods(finishGoods: any){
      this.router.navigate(['/purchase/finishGoods/update', finishGoods.id]);
    }

    deletefinishGoods(finishGoods: any) {
      this.finishGoodsService.deletefinishGoods(finishGoods.id)
        .subscribe(
          (response: any) => {
            const index = this.finishGoods.indexOf(finishGoods, 0);
            if (index > -1) {
              this.finishGoods.splice(index, 1);
              this.getfinishGoods();
              this.toast.pop('success', 'Your FinishGoods delete is not recover');
            }
            else {
              this.toast.pop('error', 'Your FinishGoods is safe!');
            }
          });
    }

}
