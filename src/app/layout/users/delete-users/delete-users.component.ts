import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/users.services';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent implements OnInit {
 
  deleteUser: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  // getDeleteUser() {
  //   this.usersService.getUser().subscribe((response) => {
  //     this.users = response;
  //     console.log(this.users);
  //   });
  // }

}
