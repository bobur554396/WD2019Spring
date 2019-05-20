import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {isSuper} from "@babel/types";
import {IContacts} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<IContacts[]>{
    return this.get('http://localhost:8000/api/contacts/', {})


  }
}
