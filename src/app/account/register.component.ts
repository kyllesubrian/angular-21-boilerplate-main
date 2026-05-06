import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">First Name</label>
                <input type="text" [(ngModel)]="firstName" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input type="text" [(ngModel)]="lastName" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" [(ngModel)]="email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" [(ngModel)]="password" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input type="password" [(ngModel)]="confirmPassword" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
            <div class="text-center mt-3">
              <a routerLink="/login">Already have an account?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Registered: ' + this.email);
  }
}