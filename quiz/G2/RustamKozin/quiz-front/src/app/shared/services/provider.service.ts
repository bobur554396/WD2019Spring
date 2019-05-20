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

  getContact(): Promise<IContact[]> {
    return this.get('http://localhost:8000/api/contact/', {});
  }


  createContact(name: any): Promise<IContact> {
    return this.post('http://localhost:8000/api/contact/', {
      name: name
    });
  }

  updateContact(name: any): Promise<IContact> {
    return this.put(`http://localhost:8000/api/contact/${name.id}/`, {
      name: name.name
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contact/${id}/`, {});
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
