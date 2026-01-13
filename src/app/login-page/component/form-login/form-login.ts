import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../store/actions/auth.actions';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-form-login',
  templateUrl: './form-login.html',
  styleUrls: ['./form-login.css']
})
export class FormLogin {
 loginForm: FormGroup;
  email: string = '';
  password: string = ''
  loading = false;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
      this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(4), Validators.maxLength(15)]]
    });
  }

login() {
  // console.log(`show form value ${JSON.stringify(this.loginForm.value)}`);
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.store.dispatch(UserActions.loginUser(this.loginForm.value));
}

}
