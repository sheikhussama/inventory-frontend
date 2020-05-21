import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { RawMaterialService } from '../../../core/services/materials.services';
import { ClientService } from '../../../core/services/client.services';
import { SaleService } from '../../../core/services/sale.services';

@Component({
  selector: 'app-sale-filter',
  templateUrl: './sale-filter.component.html',
  styleUrls: ['./sale-filter.component.css']
})
export class SaleFilterComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }


}
