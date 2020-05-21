import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
   
  expenseForm: FormGroup;
  userID: any;
  expenseID: any; 
  expenseDetail: any; 
  buttonText: Boolean;

  constructor(
    private fb: FormBuilder, 
    private toast:ToasterService, 
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if ((this.router.url).includes('update')) {
        this.updateFlowInit(params);
      }
    });
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.initForm();
  }

  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.expenseID = params.get('id');
      this.viewExpense();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard']);
    }
  }


  viewExpense() {
    this.expenseService.viewExpense(this.expenseID).subscribe((response) => {
      this.expenseDetail = response;
        this.preFilledForm(this.expenseDetail);
    });
  }

  initForm() {
    this.expenseForm = this.fb.group({
      id: this.expenseID ? this.expenseID : '', // to handle update flow only for class.
      purpose: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      reference: ['', [Validators.required]],
  });
}




onSubmit() {
  const data = this.expenseForm.value;
  data.user = this.userID.user_id;
  if (data.id > 0) {
    this.expenseService.updateExpense(data, data.id).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Expense has been Updated.');
      this.callCompleted();
    });
  } else {
    this.expenseService.storeExpense(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Expense has been Created.');
      this.callCompleted();
    });
  }
}

callCompleted() {
  this.expenseForm.reset();
  this.router.navigate(['/expense']);
}

preFilledForm(expense: any) {
  this.expenseForm.get('purpose').setValue(expense.purpose);
  this.expenseForm.get('amount').setValue(expense.amount);
  this.expenseForm.get('reference').setValue(expense.reference);
}
}
