import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authLogin/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {

    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (!email || !password) {
        this.toastr.error('Por favor, ingresa tanto el email como la contraseña.');
        return;
      }

      this.authService.login(email, password).subscribe(
        (response: any) => {
          this.authService.saveToken(response.token);
          this.toastr.success('Logged In!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error de autenticación', error);
        }
      );
    }
  }

}
