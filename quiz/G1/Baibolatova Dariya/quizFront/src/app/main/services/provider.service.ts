import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IContact, IAuthResponse } from '../models/contact';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{
  constructor(http: HttpClient) {
    super(http);
  }


    getContacts(): Promise<IContact[]>{
      return this.get('http://localhost:8000/api/contacts/',{});
    }

    updateContacts(contact: IContact): Promise<IContact>{
      return this.put(`http://localhost:8000/api/contacts/${contact.id}/`,{
        name: contact.name,
        phone: contact.phone
      });
    }

    deleteContacts(id: number) : Promise<any>{
        return this.delet(`http://localhost:8000/api/contacts/${id}/`,{});
    }

    createContacts(name: any) : Promise<IContact>{
      return this.post(`http://localhost:8000/api/contacts/`, {
         name: name
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
