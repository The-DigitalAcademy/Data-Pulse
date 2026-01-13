import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/actions/auth.actions';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      role: ['coordinator', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.error = 'Please fill in all required fields correctly';
      return;
    }

    const newUser: User = {
      id: '',
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      role: this.registerForm.value.role,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    console.log(newUser);
    this.store.dispatch(UserActions.registerUser({ user: newUser }));
  }

  // Helper method to access form controls in template
  get f() {
    return this.registerForm.controls;
  }
}