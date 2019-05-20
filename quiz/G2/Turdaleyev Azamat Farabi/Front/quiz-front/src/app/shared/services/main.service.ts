import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(protected http: HttpClient) {
  }

  get(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    const pars = this.getUrlParams(body);
    return this.http.get(uri, {params: pars}).toPromise().then(res => res);
  }

  post(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.post(uri, body).toPromise().then(res => res);
  }

  delete(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.delete(uri, body).toPromise().then(res => res);
  }

  put(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.put(uri, body).toPromise().then(res => res);
  }

