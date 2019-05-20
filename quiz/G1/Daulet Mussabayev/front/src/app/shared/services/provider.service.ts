import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainService} from './main.service';
import {IContacts} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getContactList(): Promise<IContacts[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }
  getContacts(contact: IContacts): Promise<IContacts[]> {
    return this.get(`http://localhost:8000/api/contacts/${contact.id}/`, {});
  }
  updateContact(contact: IContacts): Promise<IContacts> {
    return this.put(`http://localhost:8000/api/contacts/${contact.id}/`, {
      name: contact.name,
      phone: contact.phone
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/contact/${id}/`, {});
  }
}
