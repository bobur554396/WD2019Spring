import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, IContact} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();
  private contacts: any;

  constructor(http: HttpClient) {
    super(http);
  }

  getContact(): Promise<IContact[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }

  createContact(name: any): Promise<IContact> {
    return this.post('http://localhost:8000/api/contacts/', {
      name: name
    });
  }

  updateContact(category: IContact): Promise<IContact> {
    return this.put(`http://localhost:8000/api/contacts/${this.contacts.id}/`, {
      name: this.contacts.name
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contacts/${id}/`, {});
  }

  auth(login: string, password: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

}
