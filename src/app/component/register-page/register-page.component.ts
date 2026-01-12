import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  newUser : User = {
    id: '',
    name: '',
    surname: '',
    role: 'coordinator',
    email: '',
    password: ''
  }
  loading =false;
  success = false;
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ){}

  register() {
    console.log(this.newUser)
    if(!this.newUser.name || !this.newUser.surname || !this.newUser.email || !this.newUser.password)
      throwError(() => new Error("Fields are invalid"));

    this.auth.register(this.newUser).subscribe({
      next: (user) => {
        this.loading = false;
        this.success = true;
        console.log('Registration for user: ', this.newUser);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Registration failed'
        console.log('Registration failed');
      }
    });
  }
}
