import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { IContact, IToken } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) {
    super(http)
   }

  getContacts(): Promise<IContact[]>
   {
     return this.get('http://localhost:8000/api/contacts/',{});
   }


  updateContact(contact: IContact): Promise<IContact>
  {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {name: contact.name, phone:contact.phone});
  }

  deleteContact(contact: IContact): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${contact.id}/`, {});
  }

  createContact(name: any, phone:any): Promise<IContact>
  {
    return this.post(`http://localhost:8000/api/contacts/`, {name: name,phone:phone});
  }

   auth(login:any,password:any): Promise<IToken>
  {
    return this.post('http://localhost:8000/api/login/',{
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

}
