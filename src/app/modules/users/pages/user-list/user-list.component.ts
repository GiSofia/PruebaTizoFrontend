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
        { field: 'birthDate', header: 'Birth Date' },
        { field: 'isActive', header: 'Active' }
    ];
  }

  searchUsers(): void {

    if (this.searchTerm!== null) {
      // Llama al servicio para buscar usuarios por ID
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
      // Si el input de búsqueda está vacío, carga todos los usuarios
      this.loadAllUsers();
    }
  }


  private loadAllUsers(): void {
    this.usersService.getUser()
      .subscribe(users => this.users = users);
  }

  deleteUser(id: number): void {
    this.usersService.getUserById(id).subscribe(
      (user) => {
        if (user) {
          // Cambiar el estado del usuario a "inactivo"
          user.isActive = false;

          // Actualizar el usuario
          this.usersService.updateUser(user).subscribe(
            () => {
              this.toastr.success('User inactive.');
              this.loadAllUsers();
            },
            (error) => {
              this.toastr.error('Failed to update user status', error);
            }
          );
        } else {
          this.toastr.error('User not found ');
        }
      },
      (error) => {
        this.toastr.error('Failed to fetch User');
      }
    );
  }
}
