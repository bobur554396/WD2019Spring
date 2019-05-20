import { EventEmitter, Injectable } from '@angular/core';
import { IAuthResponse} from '../models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MainService} from './main.service';
import { IContact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<IContact[]> {
    return this.get('http://127.0.0.1:8000/contacts/',  {});
  }
  createContact(name: any,phone: any): Promise<IContact>{
    return this.post('http://127.0.0.1:8000/contacts/',{
      name: name,
      phone: phone
    });
  }
  updateContact(name: any, phone: any, contact: IContact): Promise<IContact>{
    return this.put(`http://localhost:8000/contacts/${contact.id}/`, {
      name: name,
      phone: phone,
    });
  }

  deleteContact(contact: IContact): Promise<any>{
    return this.delet(`http://localhost:8000/contacts/${contact.id}/`, {});
  }

  
  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/logout/', {
    });
  }

}
