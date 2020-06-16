import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../core/services/client.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-listing-client',
  templateUrl: './listing-client.component.html',
  styleUrls: ['./listing-client.component.css']
})
export class ListingClientComponent implements OnInit {

  clientDetail: any[] = [];
  config: any;

  constructor(private router: Router,
    private toast: ToasterService,private clientService: ClientService) { }

  ngOnInit(){
    this.getClient();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  getClient() {
    this.clientService.getClient().subscribe((response) => {
      this.clientDetail = response.results;
   });
  } 
   
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  updateclient(client: any){
    this.router.navigate(['/client/update', client.id]);
  }

  deleteclient(client: any) {
    this.clientService.deleteClient(client.id)
      .subscribe(
        (response: any) => {
          const index = this.clientDetail.indexOf(client, 0);
          if (index > -1) {
            this.clientDetail.splice(index, 1);
            this.getClient();
            this.toast.pop('success', 'Your client delete is not recover');
          }
          else {
            this.toast.pop('error', 'Your client is safe!');
          }
        });
  }
}
