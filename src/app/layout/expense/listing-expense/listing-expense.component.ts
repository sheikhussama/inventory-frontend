import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.services';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { logoUrl } from '../../../shared/logourl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';

declare const $:any;

@Component({
  selector: 'app-listing-expense',
  templateUrl: './listing-expense.component.html',
  styleUrls: ['./listing-expense.component.css']
})
export class ListingExpenseComponent implements OnInit {
  
  expense: any[] = []; 
  config: any;
  imageUrl: any;
  @ViewChild('pdftable', { static: false }) pdftable: ElementRef;
  
  constructor(private router: Router,
    private toast: ToasterService, 
    private expenseService: ExpenseService) {}

  ngOnInit() {
    this.getExpense();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.imageUrl = logoUrl;
  }

  getExpense() {
      this.expenseService.getExpense().subscribe((response) => {
        this.expense = response.results;
      });
    }

    pageChanged(event:any){
      this.config.currentPage = event;
    }
    updateExpense(expense: any){
      this.router.navigate(['/expense/update', expense.id]);
    }

    deleteExpense(expense: any) {
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
              this.expenseService.deleteExpense(expense.id)
              .subscribe(
                (response: any) => {
                  const index = this.expense.indexOf(expense, 0);
                  if (index > -1) {
                    this.expense.splice(index, 1);
                    this.getExpense();
                    Swal.fire(
                      'Expense is Deleted!',
                      'success'
                    )
                  }
                });
          } else {
            Swal.fire('Your Expense is safe!');
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
      pdf.save('ExpenseReport-' + myFormattedDate +'.pdf');
    }
}
