import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Contact} from '../../models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private provider: ProviderService) { }
  public username = '';
  public password = '';
  public loggedIn = false;
  public contacts: Contact[] = [];
  public newContactName = '';
  public newContactPhone = '';
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
    }
    if (this.loggedIn) {
      this.provider.getContacts().then(res => {
        this.contacts = res;
      });
    }
  }

  login() {
    if ( this.username === '' || this.password === '') {
      alert('Both fields are required!');
    } else {
      this.provider.login(this.username, this.password).then( res => {
        localStorage.setItem('token', res.token);
        this.getContacts();
        this.loggedIn = true;
        this.username = '';
        this.password = '';
      });
    }
  }

  logout() {
    this.provider.logout().then( res => {
      localStorage.clear();
      this.loggedIn = false;
    });
  }

  getContacts() {
    this.provider.getContacts().then(res => {
      this.contacts = res;
    });
  }

  updateContact(contact: Contact){
    this.provider.updateContact(contact).then(res => {
        alert('Successfully changed!');
    });
  }

  deleteContact(contact: Contact) {
      this.provider.deleteContact(contact).then(res => {
        this.provider.getContacts().then(r => {
           this.contacts = r;
        });
      });
  }

  createContact() {
    if ( this.newContactName === '' || this.newContactPhone === '') {
      alert('Both fields are required!');
    } else {
      this.provider.createContact(this.newContactName, this.newContactPhone).then( res => {
        this.provider.getContacts().then(r => {
          this.contacts = r;
          this.newContactName = '';
          this.newContactPhone = '';
        });
      });
    }
  }
}
