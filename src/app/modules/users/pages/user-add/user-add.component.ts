import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    id:            new FormControl(0),
    name: new FormControl(''),
    lastName:   new FormControl(''),
    email:        new FormControl(''),
    password:        new FormControl(''),
    role:         new FormControl(''),
    jobTitle:       new FormControl(''),
    birthDate:       new FormControl(''),
    isActive:      new FormControl(true)
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
      isActive: this.currentUser.isActive,
    };

    this.loginService.addLoginUser(loginUserData)
    .subscribe(() => {
      this.toastr.success(`UserLogin add!`);
    });
  }
}
