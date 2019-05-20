import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IContact} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(): Promise<IContact[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }

  createContact(name: any): Promise<IContact> {
    return this.post('http://localhost:8000/api/contacts/', {
      name: name
    });
  }

  deleteContact(id: number): Promise<any> {
    return this.delet('http://localhost:8000/api/contacts/' + id + '/', {
    });
  }

  updateCategory(contact: IContact) {
    return this.put('http://localhost:8000/api/categories/' + contact.id + '/', {
      name: contact.name
    });
  }


}