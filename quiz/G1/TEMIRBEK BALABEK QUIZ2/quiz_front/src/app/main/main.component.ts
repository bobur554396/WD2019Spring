import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {IContact} from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public username = '';
  public password = '';
  public logged = false;
  public name: any = '';
  public phone: any = '';
  public contacts: IContact[] = [];
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getContacts().then(res => {
        this.contacts = res;
      });
    }
  }
  // getPosts() {
  //   this.provider.getPosts().then(res => {
  //     this.posts = res;
  //   });
  // }
  createContact() {
    this.provider.createContact(this.name, this.phone).then( res => {
      this.provider.getContacts().then( r => {
        this.contacts = r;
        this.name = '';
        this.phone = '';
      });
    });
  }
  removeContact(contact: IContact) {
    this.provider.removeContact(contact.id).then(res => {
      console.log(`${contact.name} deleted`);
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });
  }
  updateContact(contact: IContact) {
    this.provider.updateContact(contact).then(res => {
      console.log(contact.id + 'updated');
    });
  }
  auth() {
    if (this.username !== '' && this.password !== '') {
      this.provider.auth(this.username, this.password).then( res => {
        localStorage.setItem('token', res.token);
        this.provider.getContacts().then(r => {
          this.contacts = r;
        });
        console.log('OK');
        this.logged = true;
      });
    }
  }
  logout() {
    this.provider.logout().then( res => {
      localStorage.clear();
      this.logged = false;
    });
  }

}
