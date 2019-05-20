import { Injectable } from '@angular/core';
import {MainService} from './main.service' ;
import {IAuthResponse, IContact} from './../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<IContact[]> {
    return this.get(`http://localhost:8000/api/contacts/`, {

    });
  }

  deleteContact(contact: IContact): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${contact.id}/`, {

    });
  }

  updateContact(contact: IContact): Promise<IContact> {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }

  createContact(name: any, phone: any): Promise<IContact> {
    return this.post(`http://localhost:8000/api/contacts/`, {
      name: name,
      phone: phone
    });
  }


  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post(`http://localhost:8000/api/login/`, {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post(`http://localhost:8000/api/logout/`, {

    });
  }

}
