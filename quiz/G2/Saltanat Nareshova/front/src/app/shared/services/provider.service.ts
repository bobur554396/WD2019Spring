import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import {IContactlist, IAuthResponse} from '../module/modules';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http:HttpClient){
    super(http);  
  }

  getContactList():Promise<IContactlist[]>{
    return this. get('http://127.0.0.1:8000/contactlist/', {})
  }

  auth(login: any, password: any): Promise<IAuthResponse>{
    return this.post('http://127.0.0.1:8000/login/', {
      username: login,
      password: password
    });
  }

  createContactList(name: any): Promise<IContactlist> {
    return this.post('http://127.0.0.1:8000/contactlist/', {
    //tslint:disable-next-line: object-literal-shorthand
      name: name
    });
  }

  updateContactList(tasklist: IContactlist): Promise<IContactlist> {
    return this.put(`http://127.0.0.1:8000/contactlist/${tasklist.name}/`, {
      name: tasklist.name
    });
  }

  deleteContactList(id: number): Promise<any> {
    return this.delet(`http://127.0.0.1:8000/contactlist/${id}/`, {});
  }
 
}