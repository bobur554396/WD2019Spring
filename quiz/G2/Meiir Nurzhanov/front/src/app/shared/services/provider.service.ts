import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Contact, IAuthResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http)
   }

   createContact(name: any, phone: any): Promise<Contact>{
    return this.post( 'http://127.0.0.1:8000/api/contacts/', { 
      name: name,
      phone: phone
    });
  }

   getContacts():Promise<Contact[]>
   {
     return this.get(`http://127.0.0.1:8000/api/contacts/`, {});
   }



  updateContact(contact: Contact): Promise<Contact>{
   return this.put(`http://127.0.0.1:8000/api/contacts/${contact.id}/`, {
     name: contact.name,
     phone: contact.phone
   });
  }

  deleteContact(id: number): Promise<any>{
     return this.delet(`http://127.0.0.1:8000/api/contacts/${id}/`, {});
  }


  auth(login: any, password: any):Promise<IAuthResponse>{
    return this.post(`http://127.0.0.1:8000/api/login/`,{
   username: login,
   password: password
    });
  }

  logout(): Promise<any>{
    return this.post(`http://127.0.0.1:8000/api/logout/`,{

    });
  }

   
}
