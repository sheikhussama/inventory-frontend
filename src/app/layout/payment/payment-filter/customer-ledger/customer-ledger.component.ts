import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../../core/services/client.services';
import { ToasterService } from 'angular2-toaster';
import { logoUrl } from '../../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.scss']
})
export class CustomerLedgerComponent implements OnInit {
  
  client: any;
  clientDetail: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(private toast: ToasterService, private clientService: ClientService ,) { }

  ngOnInit(): void {
    this.getClient();
    this.imageUrl = logoUrl;
  }
  

   getClient(){
    this.clientService.getClient().subscribe(response =>{
        this.client = response.results;
    })
  }

  selectClient(event: any){
   this.getCustomerLedger(event.id);
  }

  getCustomerLedger(id: any){
    const params = {
      id: id
    }
    this.clientService.customerLedger(params).subscribe(response =>{
      this.toast.pop('success', 'Success!', 'Customer Ledger Search Compeleted.')
      this.clientDetail = response;
    })
  }

  genReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Expense Report', 350, 80);

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
    pdf.save('PaymentsReport-' + myFormattedDate +'.pdf');
  }
}
