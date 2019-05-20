import { Injectable } from '@angular/core';
import {ExService} from './ex.service';
import {HttpClient} from '@angular/common/http';
import {Contact, IAuthResponse} from '../models/model'
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends ExService {

  constructor(http:HttpClient) {
    super(http);
   }
   getContacts(): Promise<Contact[]>{
     return this.get(`http://127.0.0.1:8000/api/contacts/`,{});
   }
  
   updateList(list:Contact):Promise<Contact>{
    return this.put(`http://127.0.0.1:8000/api/contacts/${list.id}/`, {
      name: list.name
    });
  }
  deleteList(id:Number):Promise<any>{
    return this.delet(`http://127.0.0.1:8000/api/contacts/${id}/`,{})
  }
 
  logIn(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {
    });
  }

}