import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, IContact } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
   }

  login(login: any, password: any): Promise<AuthResponse>{
    return this.post('http://localhost:8000/api/login/',{
      username: login,
      password: password
    });
  }

  logout(): Promise<any>{
    return this.post('http://localhost:8000/api/logout/',{})
  }

  getContacts(): Promise<IContact[]>{
    return this.get('http://localhost:8000/api/contacts/',{})
  }

  createNewContact(name: any, phone:any): Promise<IContact>{
    return this.post('http://localhost:8000/api/contacts/',{
      name: name,
      phone: phone
    });
  }

  // updateContact()

  deleteContact(contact: IContact){
    return this.delet('http://localhost:8000/api/contacts/'+contact.id+'/',{})
  }

  updateContact(contact: IContact){
    return this.put('http://localhost:8000/api/contacts/'+contact.id+'/',{
      name: contact.name,
      phone: contact.phone
    })
  }
}
