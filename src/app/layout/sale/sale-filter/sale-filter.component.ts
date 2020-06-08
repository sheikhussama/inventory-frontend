import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-sale-filter',
  templateUrl: './sale-filter.component.html',
  styleUrls: ['./sale-filter.component.css']
})
export class SaleFilterComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('div button').click(function(){
        $('button').removeClass("active");
        $(this).addClass("active");
    });
    });
  }


}
