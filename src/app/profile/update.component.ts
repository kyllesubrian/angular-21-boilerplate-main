import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-profile-update',
    templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        const account = this.accountService.accountValue;
        this.form = this.formBuilder.group({
            firstName: [account?.firstName || '', Validators.required],
            lastName: [account?.lastName || '', Validators.required],
            email: [account?.email || '', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        const accountId = this.accountService.accountValue?.id;
        if (accountId) {
            this.accountService.update(accountId, this.form.value).subscribe();
        }
    }
}