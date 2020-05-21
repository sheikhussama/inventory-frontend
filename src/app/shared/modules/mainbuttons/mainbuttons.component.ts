import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mainbuttons',
  templateUrl: './mainbuttons.component.html',
  styleUrls: ['./mainbuttons.component.css']
})
export class MainbuttonsComponent implements OnInit {
  @Input() routerLinkName: string;
  @Input() buttonName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
