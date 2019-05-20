import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/models';
import { IAuthResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getContact () : Promise <Contact[]> {
    return this.get(`http://localhost:8000/api/contacts/`, {});
  }

  updateContact (contacts : Contact) : Promise <Contact> {
    return this.put(`http://localhost:8000/api/contacts/${contacts.id}/`, {
      name : contacts.name
    })
  } 

  createContact (name : any) : Promise <Contact> {
    return this.post (`http://localhost:8000/api/contacts/`, {
      name : name
    })
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${id}/`, {});
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
}
