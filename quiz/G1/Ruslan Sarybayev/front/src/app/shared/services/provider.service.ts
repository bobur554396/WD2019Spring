import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, ICnt} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<ICnt[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }


  createContact(name: any, phone: any): Promise<ICnt> {
    return this.post('http://localhost:8000/api/contacts/', {
      name: name,
      phone: phone
    });
  }

  updateContact(contact: ICnt): Promise<ICnt> {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {
      name: contact.name
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${id}/`, {});
  }

  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {
    });
  }

}
