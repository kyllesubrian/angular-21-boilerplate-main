import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-profile-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent {
    constructor(public accountService: AccountService) { }
}