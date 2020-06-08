import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-purchase-filter',
  templateUrl: './purchase-filter.component.html',
  styleUrls: ['./purchase-filter.component.css']
})
export class PurchaseFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function(){
      $('div button').click(function(){
        $('button').removeClass("active");
        $(this).addClass("active");
    });
    });
  }

}
