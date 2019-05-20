import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IAuthResponse, IContact} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }
  getContacts(): Promise<IContact[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }

  createContact(n: any, p: any): Promise<IContact> {
    return this.post('http://localhost:8000/api/contacts/', {
      name: n,
      phone: p
    });
  }
  updateContact(contact: IContact): Promise<IContact> {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${id}/`, {});
  }

  auth(login: any, passwordd: any): Promise<IAuthResponse> {
    return this.post(`http://localhost:8000/api/login/`, {
      username: login,
      password: passwordd
    });
  }

  logout(): Promise<any> {
    return this.post(`http://localhost:8000/api/logout/`, {});
  }

}
