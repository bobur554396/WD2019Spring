import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import {
  IContact,
  IUser,
  IAuthResponse
} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http)
   }

  getContactList(): Promise<IContact[]> {
     return this.get("http://127.0.0.1:8000/api/contacts/", {});
   }

  updateContact(contact: IContact): Promise<IContact> {
    return this.put(`http://127.0.0.1:8000/api/contacts/${contact.id}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }

  deleteContact(contact: IContact): Promise<IContact> {
    return this.delete(`http://127.0.0.1:8000/api/contacts/${contact.id}/`, {});
  }

  createContact(contactName: string, contactPhone: string): Promise<IContact> {
    return this.post("http://127.0.0.1:8000/api/contacts/", {
      name: contactName,
      phone: contactPhone
    });
  }


  auth(username: any, password: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/api/login/', {
      username: username,
      password: password
    })
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {})
  }
}
