import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/users.services';
import { ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2'

declare const $: any;

@Component({
  selector: 'app-listing-users',
  templateUrl: './listing-users.component.html',
  styleUrls: ['./listing-users.component.css']
})
export class ListingUsersComponent implements OnInit {

  users: any;

  constructor(private toast: ToasterService, private usersService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUser().subscribe((response) => {
      this.users = response;
    });
  }

  showForm() {
    $("#update-form").modal()
  }


  deleteUser(user: any) {
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
          const params = {
            user_id: user.id
          }
          this.usersService.deleteUser(params)
            .subscribe(
              (response: any) => {
                const index = this.users.indexOf(user, 0);
                if (index > -1) {
                  this.users.splice(index, 1);
                  this.getUsers();
                  Swal.fire(
                    'Sale is Deleted!',
                    'success'
                  )
                }
              });
        } else {
          Swal.fire('Your Sale is safe!');
        }
      },
      );
  }
}
