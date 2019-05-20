import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IContact, IAuthResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class ProviderService extends MainService{

  constructor(http: HttpClient) {
    super(http);
 }
  getContacts(): Promise<IContact[]>{
    return this.get('http://127.0.0.1:8000/api/contacts/', {});
  }

  updateContacts(contacts: IContact): Promise<IContact>{
    return this.put(`http://localhost:8000/api/contacts/${contacts.id}`,{
      name: contacts.name,
      phone: contacts.phone
    });
  }

  deleteContacts(id: number) : Promise<any>{
     return this.delet(`http://localhost:8000/api/contacts/${id}`,{});
  }

  createContacts(name: any, phone: any) : Promise<IContact>{
    return this.post(`http://localhost:8000/api/contacts/`, {
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
