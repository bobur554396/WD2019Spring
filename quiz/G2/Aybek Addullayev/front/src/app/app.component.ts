import { Component } from '@angular/core';
import {ProviderService} from '../app/shared/services/provider.service'
import { IContact } from '../app/shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public authorized = false;

  public login = '';
  public password = ''; 
  public contacts: IContact[] = [];


  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authorized = true;
    }

    if (this.authorized) {
      console.log(token);
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    }

  }
  auth() {
    if (this.login !== '' && this.password !== '') {
      console.log(this.login + this.password);
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.authorized = true;
        this.provider.getContacts().then(r => {
          this.contacts = r;
        });
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.authorized = false;
      localStorage.clear();
    });
  }

  updateContact(c: IContact) {
    
    this.provider.updateContact(c).then(res => {
      alert(c.name + ' is updated!');
    });
  }

  deleteContact(c: IContact) {
    this.provider.deleteContact(c.id).then(res => {
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
      alert(c.name + ' is deleted!');
    });
   
    
  }
}
