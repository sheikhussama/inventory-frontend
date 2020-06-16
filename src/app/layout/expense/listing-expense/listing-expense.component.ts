import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.services';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-expense',
  templateUrl: './listing-expense.component.html',
  styleUrls: ['./listing-expense.component.css']
})
export class ListingExpenseComponent implements OnInit {
  
  expense: any[] = []; 
  config: any;

  constructor(private router: Router,
    private toast: ToasterService, 
    private expenseService: ExpenseService) {}

  ngOnInit() {
    this.getExpense();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
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
      this.expenseService.deleteExpense(expense.id)
        .subscribe(
          (response: any) => {
            const index = this.expense.indexOf(expense, 0);
            if (index > -1) {
              this.expense.splice(index, 1);
              this.getExpense();
              this.toast.pop('success', 'Your Expense delete is not recover');
            }
            else {
              this.toast.pop('error', 'Your Expense is safe!');
            }
          });
    }
}
