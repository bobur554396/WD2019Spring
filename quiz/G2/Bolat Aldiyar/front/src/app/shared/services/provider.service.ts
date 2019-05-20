import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MainService} from './main.service';
import {Contact, Token} from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }
  createContact(namE: any, phonE: any): Promise<Contact> {
    return this.post('http://127.0.0.1:8000/api/contacts', {name: namE, phone: phonE});
  }
  getContacts(): Promise<Contact[]> {
    return this.get('http://127.0.0.1:8000/api/contacts',  {});
  }
  updateContact(id: number, namee: string, phonee: string) {
    return this.put('http://127.0.0.1:8000/api/contacts/' + id, {
      name: namee,
      phone: phonee
    });
  }
  deleteContact(id: number) {
    return this.delet('http://127.0.0.1:8000/api/contacts/' + id, {});
  }
  auth(usernamE: string, passworD: string): Promise<Token> {
    return this.post('http://localhost:8000/api/login/', {
      username: usernamE,
      password: passworD
    });
  }
  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {
    });
  }
}
