import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users : User[] = [];

  cols: any[] = [];

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.usersService.getUser()
      .subscribe(users => this.users = users);

      this.cols = [
        { field: '#', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'lastName', header: 'LastName' },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' },
        { field: 'jobTitle', header: 'Job Title' },
        { field: 'birthDate', header: 'Birth Date' }
    ];
  }
}
