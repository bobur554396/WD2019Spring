import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MainService} from './main.service';
import { Token, Contact} from '../models/models';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }

  formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  login(username: string, password: string): Promise<Token> {
    return this.post('http://localhost:8000/api/login/', {
      username: username,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {
    });
  }

  getContacts(): Promise<Contact[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }

  updateContact(contact: Contact): Promise<Contact> {
    return this.put('http://localhost:8000/api/contacts/' + contact.id + '/', {
      name: contact.name,
      phone: contact.phone
    });
  }
  deleteContact(contact: Contact) {
    return this.delet('http://localhost:8000/api/contacts/' + contact.id + '/', {});
  }

  createContact(name: string, phone: string) {
    return this.post('http://localhost:8000/api/contacts/', {
      name: name,
      phone: phone
    });
  }
}
