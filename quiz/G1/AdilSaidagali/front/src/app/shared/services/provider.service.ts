import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, IContact} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<IContact[]> {
    return this.get('http://http://127.0.0.1:8000/api/contacts/', {});
  }

  createContacts(name: any): Promise<IContact> {
    return this.post('http://http://127.0.0.1:8000/api/contacts/', {
      name: name
    });
  }

  updateContact(contact: IContact): Promise<IContact> {
    return this.put(`http://http://127.0.0.1:8000/api/contacts/${contact.id}/`, {
      name: contact.name
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/categories/${id}/`, {});
  }

  auth(login: string, password: string): Promise<IAuthResponse> {
    return this.post('http://http://127.0.0.1:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://http://127.0.0.1:8000/api/logout/', {});
  }

}
