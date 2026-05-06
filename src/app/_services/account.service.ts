import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Account {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    jwtToken?: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject = new BehaviorSubject<Account | null>(null);

    constructor(private http: HttpClient) { }

    get accountValue() { return this.accountSubject.value; }

    login(email: string, password: string) {
        return this.http.post<Account>('/accounts/authenticate', { email, password })
            .pipe(map(account => {
                this.accountSubject.next(account);
                return account;
            }));
    }

    register(params: any) {
        return this.http.post('/accounts/register', params);
    }

    update(id: string, params: any) {
        return this.http.put(`/accounts/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`/accounts/${id}`);
    }

    getAll() {
        return this.http.get<Account[]>('/accounts');
    }

    getById(id: string) {
        return this.http.get<Account>(`/accounts/${id}`);
    }

    forgotPassword(email: string) {
        return this.http.post('/accounts/forgot-password', { email });
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post('/accounts/reset-password', { token, password, confirmPassword });
    }

    verifyEmail(token: string) {
        return this.http.post('/accounts/verify-email', { token });
    }

    logout() {
        this.accountSubject.next(null);
    }
}