import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';

@Component({ templateUrl: 'verify-email.component.html' })
export class VerifyEmailComponent implements OnInit {
    token!: string;
    verifying = true;
    verified = false;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.token = this.route.snapshot.queryParams['token'];
        if (!this.token) {
            this.verifying = false;
            this.error = 'No verification token provided';
            return;
        }
        this.accountService.verifyEmail(this.token)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.verifying = false;
                    this.verified = true;
                    this.alertService.success('Email verified successfully! You can now login.', { keepAfterRouteChange: true });
                },
                error: (error: any) => {
                    this.verifying = false;
                    this.error = error;
                    this.alertService.error(error);
                }
            });
    }
}