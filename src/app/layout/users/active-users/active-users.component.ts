import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/users.services';
import { ToasterService } from 'angular2-toaster';
declare const $: any

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  
  updateForm: FormGroup

  constructor(private fb: FormBuilder,private userService: UserService,  private toast: ToasterService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.updateForm = this.fb.group({
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
    });
  }


  onSubmit() {
    const data = this.updateForm.value;
    this.userService.changePassword(data).subscribe((response: any) => {
      this.toast.pop('success', 'Success!', 'Password Change Successfully.');
      this.callCompleted();
    },
    (error) => {
      if(error.status === 400) {
        this.toast.pop('error', 'Error!','Password Not Change');
      }
    });
  }
 

  callCompleted(){
    this.updateForm.reset();
  }

}
