import { Component } from '@angular/core';

import { AccountService } from '@app/_services';

@Component({ templateUrl: './home.component.html', standalone: false })
export class HomeComponent {
    constructor(private accountService: AccountService) { }

    get account() {
        return this.accountService.accountValue;
    }

    get fullName() {
        const account = this.account;
        return account ? `${account.firstName || ''} ${account.lastName || ''}`.trim() : '';
    }
}
