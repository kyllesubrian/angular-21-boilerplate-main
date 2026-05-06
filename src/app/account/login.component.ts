import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }
    alert('Login successful!\nEmail: ' + this.email);
    this.router.navigate(['/']);
  }
}