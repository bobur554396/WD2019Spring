import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Main } from './main.service';
import {IAuthResponse, Contact} from '../models';
const API_URL = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService extends Main {

  constructor(http: HttpClient) {
    super(http);
  }

  public getPostList(): Promise<[Contact]> {
    return this.get(API_URL + 'contacts/', {});
  }
  public createPost(contact: Contact) {
    return this.post(API_URL + 'contacts/', {
      id: contact.id,
      name: contact.name,
      phone: contact.phone
    });
  }
  public getDetailPost(contact: Contact) {
    return this.get(API_URL + 'contacts/' + contact.id + '/', contact);
  }
  public putDetailPost(contact: Contact) {
    return this.put(API_URL + 'contacts/' + contact.id + '/', {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      created_by: 1
    });
  }
  public deleteTaskList(contact: Contact) {
    return this.delete(API_URL + 'contacts/' + contact.id + '/', contact);
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
