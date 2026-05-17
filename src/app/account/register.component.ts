import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  submitted = false;
  loading = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.password !== this.confirmPassword) {
      this.alertService.error('Passwords do not match');
      return;
    }

    if (!this.acceptTerms) {
      this.alertService.error('You must accept the Terms and Conditions');
      return;
    }

    this.loading = true;

    this.accountService.register({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      acceptTerms: this.acceptTerms
    } as any).subscribe({
      next: () => {
        this.alertService.success('Registration successful! Please check your email to verify your account.', { keepAfterRouteChange: true });
        this.router.navigate(['/account/login']);
      },
      error: err => {
        this.alertService.error(err?.error?.message || 'Registration failed. Please try again.');
        this.loading = false;
      }
    });
  }
}