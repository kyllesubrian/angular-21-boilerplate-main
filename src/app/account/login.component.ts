import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  onSubmit() {
    this.alertService.clear();

    if (!this.email || !this.password) {
      this.alertService.error('Please enter email and password');
      return;
    }

    this.loading = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.accountService.login(this.email, this.password)
      .pipe(first())
      .subscribe({
        next: () => this.router.navigateByUrl(returnUrl),
        error: err => {
          this.alertService.error(err?.error?.message || 'Login failed. Please try again.');
          this.loading = false;
        }
      });
  }
}