import { EventEmitter, Injectable } from '@angular/core';
import {Contact, Token} from '../models/models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MainService} from './main.service';
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<Contact[]> {
    return this.get('http://127.0.0.1:8000/api/contacts/',  {});
  }
  createContact(name: string, phone: string): Promise<Contact> {
    return this.post('http://localhost:8000/api/contacts/', {name: name});
    name: name;
    phone: phone;
  }
  updateContact(conTact: Contact) {
    return this.put('http://localhost:8000/api/contacts/' + conTact.id, {name : conTact.name});
  }

  deleteContact(conTact: Contact) {
    return this.delete('http://localhost:8000/api/contacts/' + conTact.id, {});
  }

 
  auth(username: string, password: string): Promise<Token> {
    return this.post('http://localhost:8000/api/login/', {
      username: username,
      password: password
    });
}

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {
    });
  }
}