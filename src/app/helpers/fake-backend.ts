import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { utils } from 'protractor';
let users = [{
    "id":1,
    "username":"mario.rossi",
    "password":"1234"
},
{
    "id":2,
    "username":"francesco",
    "password":"12345"
}];

let utenze = [{
    "id":1,
    "firstName":"Mario",
    "lastName":"Rossi",
    "fiscalCode":"MRNGDH2138121JHAk"
},
{
    "id":2,
    "firstName":"Maria",
    "lastName":"Verdi",
    "fiscalCode":"MRNHDGFA923743899"
}]


// array in local storage for registered users


@Injectable()
export class FakeBackend implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            
            switch (true) {
               
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                
                case url.endsWith('/users') && method === 'GET':
                    return getUtenze();
                
                case url.endsWith('/users/add') && method ==='POST':
                    return addUtenza();
                case url.endsWith('/users/modify') && method ==='PUT':
                    return modificaUtenza();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUtenza();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            
            if (!user) return error('Username or password is incorrect');
            return ok({
              
                user: user.username,
               
                token: 'fake-jwt-token'
            })
        }

        

        function getUtenze() {
            if (!isLoggedIn()) return unauthorized();
            return ok(utenze);
        }

        function addUtenza() {
            
            const utenza = body;
            utenze.push(utenza);
            utenza.id = utenze.length ? utenze.length : 1;
            return ok(utenza);
        }

        function modificaUtenza() {
            const utenza = body;
            console.log(body.id);
            utenza.id = body.id;
            let utenteDaModificare = utenze.find(x=>x.id === body.id);
            utenteDaModificare.firstName = utenza.firstName;
            utenteDaModificare.lastName = utenza.lastName;
            utenteDaModificare.fiscalCode = utenza.fiscalCode;
            return ok( utenteDaModificare);
        }
        function deleteUtenza() {
            if (!isLoggedIn()) return unauthorized();
            utenze = utenze.filter(x => x.id !== idFromUrl());
            return ok();
        }
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackend,
    multi: true
};

