import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
    standalone: false,
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    accounts: Account[] = [];
    Loading = false;

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.Loading = true;
        this.accountService.getAll()
            .subscribe({
                next: accounts => {
                    this.accounts = accounts;
                    this.Loading = false;
                },
                error: () => {
                    this.Loading = false;
                }
            });
    }

    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        if (!account) return;
        (account as any).isDeleting = true;
        this.accountService.delete(id)
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id);
            });
    }
}