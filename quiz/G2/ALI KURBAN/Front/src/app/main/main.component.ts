import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import { IContact } from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contacts: IContact[] = [];
  public name: any = '';
  public phone: any = '';

  public isLogged = false;
  public login = '';
  public password = '';
  public currentId = -1;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getContacts().then(res => {
      this.contacts = res;
    });
  }

  showContactDetails(contact: IContact) {
    this.currentId = contact.id;
  }

  createContact() {
    if (this.name !== '' && this.phone !== '') {
      this.provider.createContact(this.name, this.phone).then(res => {
        this.name = '';
        this.phone = '';
        this.contacts.push(res);
      });
    }
  }

  editContact(contact: IContact) {
    this.provider.updateContact(contact).then(res => {

    });
  }

  deleteContact(contact: IContact) {
    this.provider.deleteContact(contact.id).then(res => {
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isLogged = true;
        // this.getCategories();
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.isLogged = false;
      localStorage.clear();
    });
  }

}
