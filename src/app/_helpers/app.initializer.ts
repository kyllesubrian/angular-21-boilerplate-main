import { AccountService } from '../_services/account.service';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // Simplify - just resolve immediately
        resolve(null);
    });
}