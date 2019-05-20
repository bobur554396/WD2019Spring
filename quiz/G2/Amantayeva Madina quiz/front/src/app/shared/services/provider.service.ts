import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactsService } from './main.service';
import { IAuthResponse, IContacts} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<IContacts[]> {
    return this.get('http://127.0.0.1:8000/api/contacts/', {});
  }

  createContacts(name: any, phone: any): Promise<IContacts> {
    return this.post('http://127.0.0.1:8000/api/contacts/', {
// tslint:disable-next-line: object-literal-shorthand
      name: name,
// tslint:disable-next-line: object-literal-shorthand
      phone: phone
    });
  }

  updateContacts(contact: IContacts): Promise<IContacts> {
    return this.put(`http://127.0.0.1:8000/api/contacts/${contact.id}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }
  deleteContacts(id: number): Promise<any> {
    return this.delet(`http://127.0.0.1:8000/api/contacts/${id}/`, {});
  }

  auth(login: string, password: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      // tslint:disable-next-line: object-literal-shorthand
      password: password
    });
  }

  logout(): Promise<any>{
    return this.post('http://localhost:8000/api/logout/', {} );
  }


}
