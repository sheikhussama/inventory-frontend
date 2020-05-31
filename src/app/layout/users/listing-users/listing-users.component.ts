import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/users.services';
import { ToasterService } from 'angular2-toaster';

declare const $: any;

@Component({
  selector: 'app-listing-users',
  templateUrl: './listing-users.component.html',
  styleUrls: ['./listing-users.component.css']
})
export class ListingUsersComponent implements OnInit {

  users:any;

  constructor(private toast: ToasterService, private usersService: UserService) { }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this.usersService.getUser().subscribe((response) => {
      this.users = response;
    });
  }

  showForm(){
    $("#update-form").modal()
  }

  deleteUser(user: any) {
    this.usersService.deleteUser(user.id)
      .subscribe(
        (response: any) => {
          const index = this.users.indexOf(user, 0);
          if (index > -1) {
            this.users.splice(index, 1);
            this.getUsers();
            this.toast.pop('success', 'User is delete Not recover');
          }
          else {
            this.toast.pop('error', 'User is safe!');
          }
        },
        (error) => {
          if(error.status === 400) {
            this.toast.pop('error', 'Error!','Invalid Info');
          }
  });
  }
}
