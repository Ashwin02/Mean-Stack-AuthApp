import { Http, Response, Headers } from "@angular/http";
import { Message } from "./message.model";
import { Injectable } from "@angular/core";

import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class MessageService {
    private messages: Message[] = [];

    ROOT_URL = 'http://localhost:3000/message';
    constructor(private http: Http){}

    addMessage(message: Message) {
        const headers = new Headers ({'Content-type': 'application/json'});
        const body = JSON.stringify(message);

        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
        .map((res)=> {res.json()});
        // .catch((err) => Observable.throw(err.json()));
    }

    getMessages() {
        return this.http.get('http://localhost:3000/message')
        .map((res) => {
            const messages = res.json().obj;
            let transFormedMessages = [];
            for(let message of messages){
                transFormedMessages.push(new Message(message.content, message.user,message.id,  null));
            }
            this.messages = transFormedMessages;
            return transFormedMessages;
        });

    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}