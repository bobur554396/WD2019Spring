import { EventEmitter, Injectable } from '@angular/core';
import { MainService } from '../services/main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse} from 'src/app/models'

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  constructor(http: HttpClient) {
    super(http);
  
  }

  getcontacts(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/contacts/',
    {headers: this.httpHeaders});
  }

  updatecontact(contact): Observable<any> {
    const body = { name: contact.name , phone: contact.phone};
    return this.http.put('http://127.0.0.1:8000/api/contacts/' + contact.id + '/', body,
    {headers: this.httpHeaders});
  }

  createcontact(contact): Observable<any> {
    const body = { name: contact.name , phone: contact.phone};
    return this.http.post('http://127.0.0.1:8000/api/contacts/', body,
    {headers: this.httpHeaders});
  }
  deletecontact(id): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/contacts/' + id + '/',
    {headers: this.httpHeaders});
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
