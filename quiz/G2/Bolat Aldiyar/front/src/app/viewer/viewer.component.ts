import { Component, OnInit } from '@angular/core';
import {Contact} from '../shared/models/model';
import {ProviderService} from '../shared/services/provider.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  public contacts: Contact[] = [];
  public name: any = '';
  public phone: any = '';
  public logged: boolean = false;
  public login: any = '';
  public password: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }

    if(this.logged){
      this.provider.getContacts().then(res => {
        this.contacts = res;
      });
    }
  }

  updateContact(contact: Contact) {
    this.provider.updateContact(contact.id, contact.name, contact.phone).then(res => {
      console.log(contact.name + ' updated');
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });
  }
  deleteContact(contact: Contact) {
    this.provider.deleteContact(contact.id).then(res => {
      console.log(contact.name + ' deleted');
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });
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
  auth(){
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);

        this.logged = true;
        this.provider.getContacts().then(res => {
          this.contacts = res;
        });

      });
    }
  }
  logout() {
    this.provider.logout().then(res => {
      this.logged = false;
      localStorage.clear();
    });
  }
}
