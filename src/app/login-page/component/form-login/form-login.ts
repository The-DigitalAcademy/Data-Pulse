import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.html',
  styleUrls: ['./form-login.css']
})
export class FormLogin {
  email: string = '';
  password: string = ''
  loading = false;
  success = false;
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  login() {
    console.log(this.email, this.password);
    if(!this.email || !this.password)
      throwError(() => new Error('Information entered is incorrect'));

    this.auth.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        this.success = true;
        console.log("Login information for...", user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Failed to login';
        console.log('Login failed', this.error);
      }
     })
  }
}
