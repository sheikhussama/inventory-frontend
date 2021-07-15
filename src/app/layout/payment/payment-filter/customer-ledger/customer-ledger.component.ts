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
        this.client = response;
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
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
    var columns = [
      res.columns[0], res.columns[1],res.columns[2],
      res.columns[3], res.columns[4],res.columns[5],
      res.columns[6]
    ];
    pdf.addImage(imgUrl, "png", 20, 20, 70, 70);
    pdf.autoTable(columns, res.data,{
      theme: 'grid',
      tableWidth: 750,
      margin: { top: 100 },
      styles: {
        fontSize: 9,
        font: 'helvetica',
        fontType: 'bold',
        }
    });
    pdf.save('PaymentsReport-' + myFormattedDate +'.pdf');
  }
}
