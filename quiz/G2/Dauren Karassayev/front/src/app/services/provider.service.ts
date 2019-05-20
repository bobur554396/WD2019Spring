import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import {Contact} from '../models'

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) { 
    super(http)
  }
  getContacts(): Promise<Contact[]>{
    return this.get('http://localhost:8000/contacts/', {});
  }
  createContacts(name:String): Promise<Contact>{
    return this.post('http://localhost:8000/contacts/', {
      name: name
    })
  }
  updateContact(task_list: Contact){
    return this.put('http://localhost:8000/contacts/${task_list.id}/', {
      name: task_list.name
    })
  }
  deleteContact(id: number){
    return this.delet('http://localhost:8000/contacts/${id}', {})
  }
}
