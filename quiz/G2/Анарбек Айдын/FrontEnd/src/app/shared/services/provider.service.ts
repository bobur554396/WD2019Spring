import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {Contact} from '../../shared/models/models';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http:HttpClient) {
    super(http);
  }

  getcontacts(): Promise<Contact[]>
  {
    return this.get('http://127.0.0.1:8000/api/contact',{})
  }

 
}