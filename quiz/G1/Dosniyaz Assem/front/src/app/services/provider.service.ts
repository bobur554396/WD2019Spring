import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Contact,IAuthResponse } from '../models/models';



@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http:HttpClient) {
    super(http);
  }

  getContacts():Promise<Contact[]>{
    return this.get('http://localhost:8000/api/contacts/',{});
  }
  updateContacts(contact:Contact):Promise<Contact>{
    return this.put(`http://localhost:8000/api/contacts/${contact.id}`,{
      name:contact.name
    });
  }
  deleteContacts(id:number):Promise<any>{
    return this.delet(`http://localhost:8000/api/contacts/${id}`,{});
  }
  
  createContact(name:any,phone:any): Promise<Contact>{
    return this.post('http://localhost:8000/api/contacts/',{
      name:name,
      phone:phone
    });
  } 

  auth(login:string,password:string):Promise<IAuthResponse>{
    return this.post('http://localhost:8000/api/login/',{
      username:login,
      password:password
    });
  }

  
  logout():Promise<any>{
    return this.post('http://localhost:8000/api/logout/',{})
  }


}

