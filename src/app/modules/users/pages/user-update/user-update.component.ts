import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interface';
import { LoginUserService } from 'src/app/services/loginUser/login-user.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  public userForm = new FormGroup({
    id:           new FormControl(0, [Validators.required, Validators.min(1)]),
    name:         new FormControl('', [Validators.required]),
    lastName:     new FormControl('', [Validators.required],),
    email:        new FormControl('', [Validators.required, Validators.email]),
    password:     new FormControl('', [Validators.required]),
    role:         new FormControl('', [Validators.required]),
    jobTitle:     new FormControl('', [Validators.required]),
    birthDate:    new FormControl('', [Validators.required]),
    isActive:     new FormControl(true, [Validators.required])
  });

  constructor(private usersService: UsersService, private loginService: LoginUserService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}

  get currentUser(): User{
    const user = this.userForm.value as User;

    return user;
  }

  ngOnInit() {
    //Obteniendo el id desde el parametro de la ruta
    this.route.params.subscribe(params => {
      const userId = params['id'];

      this.usersService.getUserById(userId).subscribe(
        (user) => {
          // Asignando los valores del usuario al formulario
          this.userForm.reset(user);
        },
        (error) => {
          this.toastr.error(`Error getting user with id ${userId}:`, error);
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    // Actualizar el usuario
    this.usersService.updateUser(this.currentUser).subscribe(updatedUser => {
      this.toastr.success(`User ${updatedUser.name} with id ${updatedUser.id} updated!`);

      console.log("UserService: ", updatedUser.id)

      // Actualizar la información de inicio de sesión
      const loginUserData = {
        id: updatedUser.id,
        email: this.currentUser.email,
        password: this.currentUser.password,
        isActive: this.currentUser.isActive,
      };

      this.loginService.updateLoginUser(loginUserData).subscribe(() => {
        this.toastr.success(`LoginUser update!`);
      });
    });
  }
}
