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
  getContacts():Promise<IContact[]>{
    return this.get('http://127.0.0.1:8000/api/contacts/',{

    });

  }
  deleteContact(p:IContact):Promise<any>{
    return this.delet(`http://127.0.0.1:8000/api/contacts/${p.id}/`,{

    });
  }
  
  update(c:IContact):Promise<IContact>{
    return this.put(`http://127.0.0.1:8000/api/contacts/${c.id}/`,{
      name:c.name,
      phone:c.phone
    });

}
create(n:string,p:string):Promise<IContact>{
  return this.post(`http://127.0.0.1:8000/api/contacts/`,{
    name:n,
    phone:p
  });
}

  

}
