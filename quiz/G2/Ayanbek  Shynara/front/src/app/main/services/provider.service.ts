import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { MainService } from './main.service';
import { IAuthResponse, IContact, IUser } from '../models/models';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) {
    super(http);
  }

  getContactList(): Promise<IContact[]>{
    return this.get('http://localhost:8000/api/contacts/',{});
  }


  updateContactList(contactlist: IContact): Promise<IContact>{
    return this.put(`http://localhost:8000/api/contacts/${contactlist.id}/`,{
      name: contactlist.name
    });
  }

  deleteContactList(id: number) : Promise<any>{
     return this.delet(`http://localhost:8000/api/contacts/${id}/`,{});
  }

  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

}
