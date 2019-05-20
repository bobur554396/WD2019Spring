import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import {IContact,IAuthResponse} from '../models/model'

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) { 
    super(http);
  }

    getContacts(): Promise<IContact[]>{
      return this.get(`http://localhost:8000/main/contacts/`,{})
    }
    getContactInfo(id:number){
      return this.get(`http://localhost:8000/main/contacts/${id}/`,{});
    }
    deleteContact(id:number){
      return this.delet(`http://localhost:8000/main/contacts/${id}/`,{});
    }
    // likingPost(id:number){
    //   return this.post(`http://localhost:8000/main/contacts/${id}/likes`,{})
    // }
    updContact(contact: IContact): Promise<IContact>{
      return this.put(`http://localhost:8000/main/contacts/${contact.id}/`,{
        name: contact.name
      });
      
    }
    createContact(name: any,number: any) : Promise<IContact>{
      return this.post(`http://localhost:8000/main/contacts/`, {
         name: name,
         number: number
      });
    }
    auth(login: any, password: any): Promise<IAuthResponse> {
        return this.post(`http://localhost:8000/main/login/`, {
        username: login,
        password: password
      });
    }
    logout():Promise<any>{
      return this.post(`http://localhost:8000/main/logout/`,{});
    }

    
}
