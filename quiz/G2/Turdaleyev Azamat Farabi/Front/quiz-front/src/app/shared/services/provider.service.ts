import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IContact,IAuthResponse, IContact } from '../models/models';
// import { } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http:HttpClient){
    super(http);  
  }

 updateContact(contact: IContact): Promise<IContact> {
   return this.put(`http://localhost:8000/api/posts/${contact.id}/`, {
     name: contact.name
   });
 }

 deleteContact(id: number): Promise<any> {
   return this.delete(`http://localhost:8000/api/posts/${id}/`, {});
 }

 auth(login:any,password:any):Promise<IAuthResponse>{
   return this.contact('http://localhost:8000/api/login/',{
     username:login,
     password:password
   });
 }

 logout():Promise<any>{
   return this.contact('http://localhost:8000/api/logout/',{

   });
 }
}
