import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../../core/services/client.services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  role: any;
  clientForm: FormGroup;
  userID: any;
  clientID: any;
  clientDetail: any;
  buttonText: Boolean;
  flag: Boolean = true;
  currencyList: any;

  constructor(
    private fb: FormBuilder,
    private toast: ToasterService,
    private clientService: ClientService,
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
    this.selectCurenccy();
  }


  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.clientID = params.get('id');
      this.viewClient();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard']);
    }
  }

  viewClient() {
    this.clientService.viewClient(this.clientID).subscribe((response) => {
      this.clientDetail = response;
      this.preFilledForm(this.clientDetail);
    });
  }

  selectCurenccy() {
    this.currencyList = [{
      value: '$'
    },
    {
      value: 'PKR'
    }, {
      value: '€'
    }
    ]
  }


  initForm() {
    this.clientForm = this.fb.group({
      id: this.clientID ? this.clientID : '', // to handle update flow only for class.
      customerName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      nicNo: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      isCredit: ['', [Validators.required]],
      currencytype: [null, [Validators.required]]
    });
  }


  onSubmit() {
    const data = this.clientForm.value;
    data.user = this.userID.user_id;

    if (data.id > 0) {
      this.clientService.updateClient(data, data.id).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Client has been Updated.');
        this.callCompleted();
      });
    } else {
      this.clientService.storeClient(data).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Client has been Created.');
        this.callCompleted();
      });
    }
  }


  callCompleted() {
    this.clientForm.reset();
    this.router.navigate(['/client']);
    this.flag = false;
    setTimeout(() => { this.flag = true; })
  }

  roleBased() {
    this.role = [
      {
        id: 'D',
        value: 'Distributor'
      },
      {
        id: 'C',
        value: 'Customer'
      }
    ]
  }


  preFilledForm(client: any) {
    this.clientForm.get('customerName').setValue(client.customerName);
    this.clientForm.get('company').setValue(client.company);
    this.clientForm.get('address').setValue(client.address);
    this.clientForm.get('contactNo').setValue(client.contactNo);
    this.clientForm.get('nicNo').setValue(client.nicNo);
    this.clientForm.get('balance').setValue(client.balance);
    this.clientForm.get('detail').setValue(client.detail);
    this.clientForm.get('isCredit').setValue(client.isCredit);
  }

  get customerName() {
    return this.clientForm.get('customerName');
  }
  get company() {
    return this.clientForm.get('company');
  }
  get address() {
    return this.clientForm.get('address');
  }
  get contactNo() {
    return this.clientForm.get('contactNo');
  }
  get nicNo() {
    return this.clientForm.get('nicNo');
  }
  get balance() {
    return this.clientForm.get('balance');
  }
  get detail() {
    return this.clientForm.get('detail');
  }
  get isCredit() {
    return this.clientForm.get('isCredit');
  }
  get currencytype() {
    return this.clientForm.get('currencytype');
  }
}
