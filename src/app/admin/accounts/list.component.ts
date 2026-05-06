import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    accounts: any[] = [];
    loading = false;

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.loading = true;
        this.accountService.getAll().subscribe({
            next: (accounts) => {
                this.accounts = accounts;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    deleteAccount(id: string) {
        if (confirm('Are you sure?')) {
            this.accountService.delete(id).subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id);
            });
        }
    }
}