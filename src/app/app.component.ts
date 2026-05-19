import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
import { Role } from '@app/_models';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html'
})
export class AppComponent {
  showNav = true;
  account?: Account | null;
  Role = Role;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNav = !event.urlAfterRedirects.startsWith('/account');
    });

    this.accountService.account.subscribe(account => {
      this.account = account;
    });
  }

  logout() {
    this.accountService.logout();
  }
}