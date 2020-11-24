import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { PurchaseService } from '../../../../core/services/purchase.services';
import { ClientService } from '../../../../core/services/client.services';
import { ProductService } from '../../../../core/services/products.services';
import { DatePipe } from '@angular/common';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-raw-purchase-filter',
  templateUrl: './raw-purchase-filter.component.html',
  styleUrls: ['./raw-purchase-filter.component.css']
})
export class RawPurchaseFilterComponent implements OnInit {

  rawPurchaseFilterForm: FormGroup;
  userID: any;
  buttonText: Boolean;
  clientDetail: any[] = [];
  rawPurchaseFilter: any;
  products: any[] = []; 
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private rawPurchaseFilterService: PurchaseService,
    private clientService: ClientService,
    private productService: ProductService) { }

  ngOnInit() {
    this.initForm();
    this.getClient();
    this.getProduct();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;

  }

  initForm() {
    this.rawPurchaseFilterForm = this.fb.group({
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      productId: ["", [Validators.required]],
      distibutorId: ["", [Validators.required]],
  });
}

getProduct() {
  this.productService.getProducts().subscribe((response) => {
    this.products = response.results;
  });
}  

getClient() {
  this.clientService.getClient().subscribe((response) => {
    this.clientDetail = response.results;
 });
} 

onSubmit() {
  const data = this.rawPurchaseFilterForm.value;
  if(data.productId !== null ||  data.productId === null ) {
    data.productId = data.productId ? data.productId : "";
    data.distibutorId = data.distibutorId ? data.distibutorId : "";
    this.rawPurchaseFilterService.purchaseRawFilter(data).subscribe((response: any) => {
      this.rawPurchaseFilter = response;
      this.toast.pop('success', 'Success!', 'Raw Purchase Search is Completed.');
      this.callCompleted();
    });

  }
  else if ( data.distibutorId !== null || data.distibutorId === null) {
    this.rawPurchaseFilterService.purchaseRawFilter(data).subscribe((response: any) => {
      this.rawPurchaseFilter = response;
      this.toast.pop('success', 'Success!', 'Raw Purchase Search is Completed.');
      this.callCompleted();
    });
  }
}
pageChanged(event:any){
  this.config.currentPage = event;
}
callCompleted() {
  this.rawPurchaseFilterForm.reset();
}

changeProductEvent(event: any) {
  this.rawPurchaseFilterForm.get('productId').setValue(event.id);

}

changeDistributorEvent(event: any) {
  this.rawPurchaseFilterForm.get('distibutorId').setValue(event.id);
}

genReport() {
  var pdf = new jsPDF('l', 'pt', 'a4');
  let pipe = new DatePipe('en-US'); // Use your own locale
  const now = Date.now();
  const myFormattedDate = pipe.transform(now, 'short');
  pdf.cellInitialize();
  pdf.setFontSize(20);
  pdf.text('Raw Purchase Filter Report', 350, 80);
  pdf.text('Date: ' + myFormattedDate, 349, 60);

  const imgUrl = this.imageUrl.imagebase64;
  // $(".text-right").hide();
  pdf.addImage(imgUrl, "png", 30, 30, 70, 70);
  pdf.autoTable({
    html: '#pdftable',
    theme: 'grid',
    tableWidth: 800,
    margin: { top: 100 },
  }
    );
  pdf.save('RawPurchaseFilterReport-' + myFormattedDate +'.pdf');
}

}
