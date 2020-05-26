import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/users.services';

@Component({
  selector: 'app-listing-users',
  templateUrl: './listing-users.component.html',
  styleUrls: ['./listing-users.component.css']
})
export class ListingUsersComponent implements OnInit {

  users:any;

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this.usersService.getUser().subscribe((response) => {
      this.users = response;
      console.log(this.users);
    });
  }

}
