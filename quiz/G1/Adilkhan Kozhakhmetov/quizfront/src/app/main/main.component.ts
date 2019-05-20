import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {Contact} from '../models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public loading = false;
  public logged = false;
  public login: any = '';
  public password: any = '';
  public contacts: Contact[] = [];
  public tok: any = '';
  public name: any = '';
  public phone: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.tok = token;
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getContacts().then(contacts => {
        this.contacts = contacts;
        setTimeout(() => {
          this.loading = true;
        }, 2000);
      });
    }
  }

  createContact() {
    if (this.name !== '' && this.phone !== '') {
      this.provider.createContact(this.name, this.phone).then(res => {
        this.contacts.push(res);
        this.name = '';
        this.phone = '';
      });
    }
  }

  getContacts() {
    this.provider.getContacts().then(contacts => {
      this.contacts = contacts;
    });
  }

  updateContact(contact: Contact) {
    this.provider.updateContact(contact).then(res => {
      console.log(contact.name + ' updated');
      this.getContacts();
    });
  }
  deleteContact(contact: Contact) {
    this.provider.deleteContact(contact.id).then(res => {
      console.log(contact.name + ' deleted');
      this.getContacts();
    });
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.logged = true;

        this.provider.getContacts().then(contacts => {
          this.contacts = contacts;
          setTimeout(() => {
            this.loading = true;
          }, 2000);
        });

      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.logged = false;
    });
  }
}
