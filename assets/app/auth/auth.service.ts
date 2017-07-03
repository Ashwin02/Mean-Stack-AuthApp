import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

import 'rxjs/Rx'; 

@Injectable()
export class AuthService{

    constructor(private http: Http){}

    signUp(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-type':'application/json'})
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
        .map((res) => res.json());
    }

     signIn(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-type':'application/json'})
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
        .map((res) => res.json());
    }

    logOut(){
        localStorage.clear();
    }
}