import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
    standalone: false,
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    accounts: Account[] = [];
    Loading = false;

    constructor(
        private accountService: AccountService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        console.log('ListComponent ngOnInit called');
        this.Loading = true;
        this.cdr.detectChanges();
        
        console.log('Calling getAll...');
        this.accountService.getAll()
            .subscribe({
                next: accounts => {
                    console.log('Accounts loaded:', accounts);
                    this.accounts = accounts;
                    this.Loading = false;
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    console.log('Error loading accounts:', err);
                    this.Loading = false;
                    this.cdr.detectChanges();
                }
            });
    }

    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        if (!account) return;
        (account as any).isDeleting = true;
        this.cdr.detectChanges();
        this.accountService.delete(id)
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id);
                this.cdr.detectChanges();
            });
    }
}