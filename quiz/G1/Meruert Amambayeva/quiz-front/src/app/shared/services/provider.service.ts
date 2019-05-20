import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse, IContact } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http:HttpClient) { 
    super(http);
  }

  login(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {
    });
  }
  getContacts():Promise<IContact[]>{
    return this.get('http://127.0.0.1:8000/api/contacts/',{
    });

  }
  getContactDetail(p:IContact):Promise<IContact>{
    return this.get(`http://127.0.0.1:8000/api/contacts/${p.id}/`,{
      id:p.id
    });
  }
  deleteContact(p:IContact):Promise<any>{
    return this.delet(`http://127.0.0.1:8000/api/contacts/${p.id}/`,{
    });
  }
  
  updateContact(p,name:string,phone:string):Promise<IContact>{
    return this.put(`http://127.0.0.1:8000/api/contacts/${p.id}/`,{
      name:name,
      phone:phone
    });
}
auth(login: any, password: any): Promise<IAuthResponse> {
  return this.post('http://localhost:8000/api/login/', {
    username: login,
    password: password
  });
}

}
