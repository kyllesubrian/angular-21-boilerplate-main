import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
    id!: string;
    isAddMode!: boolean;
    account: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.accountService.getById(this.id).subscribe(x => this.account = x);
        }
    }

    onSubmit() {
        this.loading = true;
        if (this.isAddMode) {
            this.accountService.register(this.account).subscribe(() => {
                this.router.navigate(['/admin/accounts']);
            });
        } else {
            this.accountService.update(this.id, this.account).subscribe(() => {
                this.router.navigate(['/admin/accounts']);
            });
        }
    }
}