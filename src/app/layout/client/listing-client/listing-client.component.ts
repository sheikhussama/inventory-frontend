import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../core/services/client.services';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { DatePipe } from '@angular/common';
import { logoUrl } from '../../../shared/logourl';
declare const $: any

@Component({
  selector: 'app-listing-client',
  templateUrl: './listing-client.component.html',
  styleUrls: ['./listing-client.component.css']
})
export class ListingClientComponent implements OnInit {

  clientDetail: any[] = [];
  config: any;
  imageUrl: any;

  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;

  constructor(private router: Router,
    private toast: ToasterService, private clientService: ClientService) { }

  ngOnInit() {
    this.getClient();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;

  }

  getClient() {
    this.clientService.getClient().subscribe((response) => {
      this.clientDetail = response.results;
    });
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  updateclient(client: any) {
    this.router.navigate(['/client/update', client.id]);
  }
  
  deleteclient(client: any) {
    Swal.fire({
      title: '<i class="fa fa-trash" aria-hidden="true"></i>',
      text: 'Are you sure you want to delete?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.value) {
          this.clientService.deleteClient(client.id)
            .subscribe(
              (response: any) => {
                const index = this.clientDetail.indexOf(client, 0);
                if (index > -1) {
                  this.clientDetail.splice(index, 1);
                  this.getClient();
                  Swal.fire(
                    'Client is Deleted!',
                    'success'
                  )
                }
              });
        } else {
          Swal.fire('Your Client is safe!');
        }
      });
  }

  genReport() {
    var pdf = new jsPDF('l', 'pt', 'a4');
    let pipe = new DatePipe('en-US'); // Use your own locale
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'short');
    pdf.cellInitialize();
    pdf.setFontSize(20);
    pdf.text('Date: ' + myFormattedDate, 349, 60);
    pdf.text('Client Report', 350, 80);
    // pdf.text('Roll Number: ' + this.studentWiseDetail.studentinfo.id, 348, 40);

    const imgUrl = this.imageUrl.imagebase64;
    var res = pdf.autoTableHtmlToJson(document.getElementById("pdftable"));
    var columns = [res.columns[0], res.columns[1],res.columns[2], res.columns[3],res.columns[4], res.columns[5],res.columns[6], res.columns[7]];
    pdf.addImage(imgUrl, "png", 20, 20, 70, 70);
    pdf.autoTable(columns, res.data,{
      theme: 'grid',
      tableWidth: 770,
      margin: { top: 100 }
    });
    // const pdfName = this.studentWiseDetail.studentinfo.st_name + 'report.pdf'
    pdf.save('clientsReport-' + myFormattedDate +'.pdf');
  }

}
