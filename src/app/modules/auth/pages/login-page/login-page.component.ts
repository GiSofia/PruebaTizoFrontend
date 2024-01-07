import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authLogin/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/interfaces/loginUser.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email:        new FormControl('', [Validators.required, Validators.email]),
      password:     new FormControl('', [Validators.required])
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (!email || !password) {
        this.toastr.error('Por favor, ingresa tanto el email como la contraseña.');
        return;
      }

      this.authService.login(email, password).subscribe(
        (user: LoginUser) => {
          if (user) {
            this.authService.saveUserId(user.id);
            this.toastr.success('Logged In!');
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error('Incorrect credentials.');
          }
        },
        (error) => {
          //console.error('Authentication Error.', error);
          this.toastr.error('Authentication Error. User is not active.');
        }
      );
    }
  }
}
