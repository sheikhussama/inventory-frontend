import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-payment-filter',
  templateUrl: './payment-filter.component.html',
  styleUrls: ['./payment-filter.component.css']
})
export class PaymentFilterComponent implements OnInit {

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
