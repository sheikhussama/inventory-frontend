import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-expense-filter',
  templateUrl: './expense-filter.component.html',
  styleUrls: ['./expense-filter.component.css']
})
export class ExpenseFilterComponent implements OnInit {

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
