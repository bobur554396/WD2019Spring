import { Component, OnInit } from '@angular/core';
import {Contact,Token} from '../../app/shared/models/models';
import {ProviderService} from '../../app/shared/services/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public conTacts: Contact[] = [];
  public name = '';
  public phone = '';
  public targetContacts: Contact;
  public username = '';
  public password = '';
  public logged = false;
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getContacts().then(res => {
        this.conTacts = res;
      });
    }
  }
  getContacts(contacts: Contact) {
    this.targetContacts = contacts;
  }

  createContact() {
      if (this.name !== '') {
        this.provider.createContact(this.name,this.phone).then(res => {
          this.name = '';
          this.phone= '';
          this.conTacts.push(res);
        });
      }
  }

  updateContact(contact: Contact) {
    this.provider.updateContact(contact).then(res => {});
  }

  deleteContact(contact: Contact) {
    this.provider.deleteContact(contact).then(res => {
      this.provider.getContacts().then(r => {
        this.conTacts = r;
      });
    });
  }


  login() {
    if (this.username !== '' && this.password !== '') {
      console.log(this.username);
      console.log(this.password);
      this.provider.auth(this.username, this.password).then(res => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        this.logged = true;

        this.provider.getContacts().then(r => {
          this.conTacts = r;
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