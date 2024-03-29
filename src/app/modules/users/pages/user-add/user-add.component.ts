import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interface';
import { LoginUserService } from 'src/app/services/loginUser/login-user.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  public userForm = new FormGroup({
    id:           new FormControl(0, [Validators.required, Validators.min(1)]),
    name:         new FormControl('', [Validators.required]),
    lastName:     new FormControl('', [Validators.required],),
    email:        new FormControl('', [Validators.required, Validators.email]),
    password:     new FormControl('', [Validators.required]),
    role:         new FormControl('', [Validators.required]),
    jobTitle:     new FormControl('', [Validators.required]),
    birthDate:    new FormControl('', [Validators.required]),
    isActive:     new FormControl(true)
  });

  constructor(private usersService: UsersService, private loginService: LoginUserService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}


  get currentUser(): User{
    const user = this.userForm.value as User;

    return user;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit(): void{

    if(this.userForm.invalid) return;

    this.usersService.addUser(this.currentUser)
      .subscribe(user =>{
        this.toastr.success(`${user.name} add!`);
    });

    const loginUserData = {
      id: this.currentUser.id,
      email: this.currentUser.email,
      password: this.currentUser.password,
      role: this.currentUser.role,
      isActive: this.currentUser.isActive,
    };

    this.loginService.addLoginUser(loginUserData)
    .subscribe(() => {
      this.toastr.success(`UserLogin add!`);
    });
  }
}
