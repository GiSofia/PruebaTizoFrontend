import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  searchTerm: number = 0;
  notFoundMessage: string = '';
  emptyTableMessage: string = ''

  constructor(private usersService: UsersService,  private toastr: ToastrService, private router: Router){}

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

  searchUsers(): void {

    if (this.searchTerm!== null) {
      // Llama al servicio para buscar productos por ID
      this.usersService.getUserById(this.searchTerm)
        .subscribe(
          user => {
            this.users = this.users ? [user] : [];

            if (!user) {
              this.toastr.warning(this.notFoundMessage, 'There is no user with the id');
            }
          },
          error => {
            if (error.status === 404) {
              this.toastr.warning(this.notFoundMessage, 'There is no user with the id');
            } else {
              this.notFoundMessage = 'Error al buscar el user.';
              this.toastr.error(this.notFoundMessage, 'Error');
            }
          }
        );
    } else {
      // Si el input de búsqueda está vacío, carga todos los productos
      this.loadAllUsers();
    }
  }


  private loadAllUsers(): void {
    this.usersService.getUser()
      .subscribe(users => this.users = users);
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id)
      .subscribe(
        success => {
          if (success) {
            this.toastr.success('User deleted!');
            this.loadAllUsers(); // Recarga la lista de users después de la eliminación
          } else {
            this.toastr.error('Failed to delete');
          }
        },
        error => {
          console.error('Failed to delete:', error);
          this.toastr.error('Failed to delete');
        }
      );
  }

}
