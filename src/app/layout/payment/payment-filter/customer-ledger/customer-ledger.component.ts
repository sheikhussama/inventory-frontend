import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../core/services/client.services';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.css']
})
export class CustomerLedgerComponent implements OnInit {
  
  client: any;
  clientDetail: any;

  constructor(private toast: ToasterService, private clientService: ClientService ,) { }

  ngOnInit(): void {
    this.getClient();
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
}
