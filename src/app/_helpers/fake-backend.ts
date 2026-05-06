import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

let users: any[] = [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/accounts/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/accounts/register') && method === 'POST':
                    return register();
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Email or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                jwtToken: 'fake-jwt-token'
            });
        }

        function register() {
            const user = body;
            if (users.find(x => x.email === user.email)) return error('Email is already registered');
            user.id = users.length + 1;
            users.push(user);
            return ok({ message: 'Registration successful' });
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } })).pipe(materialize(), delay(500), dematerialize());
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};