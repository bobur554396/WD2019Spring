
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import {IContact, IAuth} from '../models/models';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) {
    super(http);
  }

  getContactList(): Promise<IContact[]> {
    return this.get('http://127.0.0.1:8000/api/contacts/', {});
  }


  createContact(name: string, phone: string): Promise<IContact> {
    return this.post('http://127.0.0.1:8000/api/contacts/', {
      name,
      phone
    });
  }

  updateContact(contact: IContact): Promise<IContact> {
    return this.put(`http://127.0.0.1:8000/api/contacts/${contact.id}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://127.0.0.1:8000/api/contacts/${id}/`, {});
  }

  auth(username: any, password: any): Promise<IAuth> {
    return this.post(`http://127.0.0.1:8000/api/login/`, {
      username,
      password
    });
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {
    });
  }
}
