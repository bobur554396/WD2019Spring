import {Component, OnInit} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {IContact} from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public contacts: IContact[] = [];

  public name: any = '';

  public isLogged = false;

  public login: any = '';
  public password: any = '';

  public contactName: any = '';
  public contactPhone: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }
    if (this.isLogged) {
      this.getContacts();
    }
  }

  getContacts() {
    this.provider.getContacts().then(res => {
      this.contacts = res;
    });
  }

  createContact() {
    if (this.contactName !== '' && this.contactPhone !== '') {
      this.provider.createContact(this.contactName, this.contactPhone).then(res => {
        this.contactName = '';
        this.contactPhone = '';
        this.contacts.push(res);
      });
    }
  }

  editContact(contact: IContact) {
    this.provider.updateContact(contact).then(res => {});
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
        this.getContacts();
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
