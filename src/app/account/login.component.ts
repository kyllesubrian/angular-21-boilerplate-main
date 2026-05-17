import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    this.accountService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: error => {
        alert(error?.error?.message || 'Login failed. Please try again.');
      }
    });
  }
}