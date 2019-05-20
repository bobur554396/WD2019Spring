import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IContact, IAuthResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends MainService {


  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<IContact[]> {
    return this.get(`http://127.0.0.1:8000/api/contacts/`, {});
  }

  createContact(contact: IContact): Promise<IContact> {
    return this.post(`http://127.0.0.1:8000/api/contacts/`, {
      name: contact.name,
      phone: contact.phone
    });
  }

  updateContact(contact, pk): Promise<IContact> {
    return this.put( `http://127.0.0.1:8000/api/contacts/${pk}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }

  deleteContact(pk): Promise<any> {
    return this.delet( `http://127.0.0.1:8000/api/contacts/${pk}/`, {});
  }


  auth(login: any, pasword: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/api/login/', {
      username: login,
      password: pasword
    });
  }


  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {});
  }
}
