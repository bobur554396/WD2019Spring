import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { MainService } from './main.service';
import { IAuthResponse, IContact } from '../models';
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) {
    super(http);
  }

  auth(login: string, password: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

  getContacts(): Promise<IContact[]> {
    return this.get('http://127.0.0.1:8000/api/contacts/', {})
  }
  
  createContact(name: any): Promise<IContact> {
    return this.post('http://localhost:8000/api/contacts/', {
      name: name
    });
  }

  updateContact(contact: IContact): Promise<IContact> {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }
  
  
  deleteContact(id: number): Promise<IContact> {
    return this.delet(`http://localhost:8000/api/contacts/${id}/`, {});
  }
}
