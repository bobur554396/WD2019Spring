import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IContact, IAuth} from '../models/models'

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{
  constructor(http: HttpClient) { 
    super(http);
  }
  
getContacts(): Promise<IContact[]>{
  return this.get('http://localhost:8000/api/contacts/', {});
}

getContact(contact: IContact): Promise<IContact>{
  return this.get('http://localhost:8000/api/contacts/' + contact.id + '/', {});
}


createContact(name:any): Promise<IContact>{
  return this.post('http://localhost:8000/api/contacts/', {
    name: name
  });
 }

 updateContact(contact: IContact): Promise<IContact>{
   return this.put('http://localhost:8000/api/contacts/' + contact.id + '/'  , {
     name: contact.name
   })
 }

 
 deleteContact(pk: number): Promise<any>{
  return this.delet('http://localhost:8000/api/contacts/' + pk + '/', {});
}

auth(login: any, password: string): Promise<IAuth> {
  return this.post('http://localhost:8000/api/login/', {
    username: login,
    password: password
  });
}

logout(): Promise<any> {
 return this.post('http://localhost:8000/api/logout/', {});
}

}
