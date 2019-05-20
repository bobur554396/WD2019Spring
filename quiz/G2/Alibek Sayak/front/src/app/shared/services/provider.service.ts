import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { IContact, IAuthResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) {
    super(http);
  }

  getContactList(): Promise<IContact[]>{
    return this.get('http://localhost:8000/api/contacts/', {});
  }

  createContact(name: any, phone: any): Promise<IContact> {
    return this.post('http://127.0.0.1:8000/api/contacts/', {
      name: name,
      phone: phone
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
