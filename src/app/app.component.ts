import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html'
})
export class AppComponent {
  showNav = true;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNav = !event.urlAfterRedirects.startsWith('/account');
    });
  }

  logout() {
    this.accountService.logout();
  }
}