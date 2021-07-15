import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PurchaseService } from '../../../../core/services/purchase.services';
import { ToasterService } from 'angular2-toaster';
import { RawMaterialService } from '../../../../core/services/materials.services';
import { ClientService } from '../../../../core/services/client.services';
import { DatePipe } from '@angular/common';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-finish-goods-filter',
  templateUrl: './finish-goods-filter.component.html',
  styleUrls: ['./finish-goods-filter.component.css']
})
export class FinishGoodsFilterComponent implements OnInit {

  finishGoodsFilterForm: FormGroup;
  userID: any;
  buttonText: Boolean;
  rawMaterial: any[] = [];
  clientDetail: any[] = [];
  flag: Boolean = true;
  finishGoodsFilter: any;
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private finishGoodsFilterService: PurchaseService,
    private materialService: RawMaterialService,
    private clientService: ClientService) { }

  ngOnInit() {
    this.initForm();
    this.getMaterial();
    this.getClient();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;
  }

  initForm() {
    this.finishGoodsFilterForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      distibutorId: ['', [Validators.required]],
  });
}

getMaterial() {
  this.materialService.getMaterial().subscribe((response) => {
    this.rawMaterial = response;
  });
}  

getClient() {
  this.clientService.getClient().subscribe((response) => {
    this.clientDetail = response;

 });
} 
pageChanged(event:any){
  this.config.currentPage = event;
}
onSubmit() {
  const data = this.finishGoodsFilterForm.value; 
  if(data.productId !== null ||  data.productId === null ) {
    data.productId = data.productId ? data.productId : "";
    data.distibutorId = data.distibutorId ? data.distibutorId : "";
    this.finishGoodsFilterService.purchasefinishGoodsFilter(data).subscribe((response: any) => {
      this.finishGoodsFilter = response;
      this.toast.pop('success', 'Success!', 'Finish Goods Filter Search is Completed.');
      this.callCompleted();
    });
  }
  else if(data.distibutorId !== null || data.distibutorId === null){
    this.finishGoodsFilterService.purchasefinishGoodsFilter(data).subscribe((response: any) => {
      this.finishGoodsFilter = response;
      this.toast.pop('success', 'Success!', 'Finish Goods Filter Search is Completed.');
      this.callCompleted();
    });
  }

}

callCompleted() {
  this.finishGoodsFilterForm.reset();
}


genReport() {
  var pdf = new jsPDF('l', 'pt', 'a4');
  let pipe = new DatePipe('en-US'); // Use your own locale
  const now = Date.now();
  const myFormattedDate = pipe.transform(now, 'short');
  pdf.cellInitialize();
  pdf.setFontSize(20);
  pdf.text('Finish Goods Purchase Filter Report', 350, 80);
  pdf.text('Date: ' + myFormattedDate, 349, 60);

  const imgUrl = this.imageUrl.imagebase64;
  var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
  var columns = [
    res.columns[0], res.columns[1],res.columns[2],
    res.columns[3], res.columns[4],res.columns[5],
    res.columns[6], res.columns[7],res.columns[8]
  ];
  pdf.addImage(imgUrl, "png", 20, 20, 70, 70);
  pdf.autoTable(columns, res.data,{
    theme: 'grid',
    tableWidth: 750,
    margin: { top: 100 }
  });
  pdf.save('FinishGoodsPurchaseFilterReport-' + myFormattedDate +'.pdf');
}
}
