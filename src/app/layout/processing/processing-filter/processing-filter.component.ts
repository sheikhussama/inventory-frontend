import { Component, OnInit } from '@angular/core';
declare const $: any; 

@Component({
  selector: 'app-processing-filter',
  templateUrl: './processing-filter.component.html',
  styleUrls: ['./processing-filter.component.css']
})
export class ProcessingFilterComponent implements OnInit {

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
