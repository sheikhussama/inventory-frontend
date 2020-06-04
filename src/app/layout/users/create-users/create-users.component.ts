import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../../../core/services/users.services';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  usersForm: FormGroup;
  roleType: any;
  checkRole: any;
  username: any;

  constructor(private fb: FormBuilder,
    private toast: ToasterService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.role();
  }

  initForm() {
    this.usersForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  role() {
    this.roleType = [
      {
        id: 1,
        value: 'Super Admin'
      },
      {
        id: 2,
        value: 'Admin'
      }
    ]
  }

  roleBased($event: any) {

    if ($event.value === "Super Admin") {
      this.checkRole = 'S';
    }
    else if ($event.value === "Admin") {
      this.checkRole = 'A';

    }
  }

  checkUsername(event: any){
    this.username = event.srcElement.value;
    this.userService.checkUsername(this.username).subscribe((response: any) => { 
      if(response.Res === false) {
      this.toast.pop('success', 'Success!', 'User is not Exist.');
      }
      else if(response.Res === true) {
      this.toast.pop('error', 'Error!', 'User is Already Exist.')
      }
    });
   }

  onSubmit() {
    const data = this.usersForm.value;
     data.role =  this.checkRole;
    this.userService.storeUser(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Users has been Created.');
      this.callCompleted();
    },
    (error) => {
      if(error.status === 400) {
        this.toast.pop('error', 'Error!','Already Exist');

      }
    });
  }

  callCompleted() {
    this.usersForm.reset();
  }

  get usernames() {
    return this.usersForm.get('username');
  }
  get password() {
    return this.usersForm.get('password');
  } 
  get email() {
    return this.usersForm.get('email');
  }
}