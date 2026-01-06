import { Component } from '@angular/core';
import { FormLogin } from "./login-page/component/form-login/form-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'DataPulse';
}
