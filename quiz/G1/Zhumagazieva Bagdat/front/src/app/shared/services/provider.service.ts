import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import {  IContact, IAuthResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{


  constructor(http: HttpClient) { 
    super(http);
  }

  getContact() : Promise<IContact[]>{
    return this.get('http://localhost:8000/api/contacts/', {});
  }

  updateContact(contact: IContact): Promise<IContact> {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {
      name: contact.name
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${id}/`, {});
  }

  createContact(name: any, phone: any): Promise<IContact> {
    return this.post('http://localhost:8000/api/contacts/', {
      name: name,
      phone: phone
    });
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
