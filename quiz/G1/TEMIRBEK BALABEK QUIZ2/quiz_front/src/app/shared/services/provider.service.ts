import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, IContact} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }
  createContact(nname: any, pphone: any): Promise<any> {
    return this.post('http://localhost:8000/api/contacts/', {
      name: nname,
      phone: pphone
    });
  }
  getContacts(): Promise<IContact[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }
  removeContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${id}/`, {});
  }
  auth(uname: string, pword: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: uname,
      password: pword
    });
  }
  updateContact(contact: IContact): Promise<any> {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {
      name : contact.name,
      phone : contact.phone
    });
  }
  logout(): Promise<any> {
    return this.post(`http://localhost:8000/api/logout/`, {});
  }
}
