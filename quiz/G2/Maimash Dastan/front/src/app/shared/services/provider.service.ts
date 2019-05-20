import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import {  } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {
  public sendMessage=new EventEmitter<string>();
  constructor(http:HttpClient) {
    super(http);
   }
   
    loginIn(login:string,password:string ){
     return this.post('http://127.0.0.1:8000/api/login/',{'username':login,'password':password})
   }
   logOut(login:string,password:string ){
    return this.post('http://127.0.0.1:8000/api/logout/',{'username':login,'password':password})
  }
   
}
