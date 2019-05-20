import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { Contact } from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contacts : Contact [] = [];
  public name : any = '';
  public isLogged = false;
  public login = '';
  public password = '';

  constructor(private provider : ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }

    if (this.isLogged) {
      this.getContact();
    }
  }

  getContact() {
    this.provider.getContact().then(res => {
      this.contacts = res;
    });
  }

  updateContact (c : Contact) {
    this.provider.updateContact(c).then (res => {
      console.log(c.name + ' updated')
    })
  }

  deleteContact (c : Contact) {
    this.provider.deleteContact(c.id).then (res => {
      console.log (c.name + ' deleted');
      this.provider.getContact().then (r => {
        this.contacts = r;
      })
    })
  }

  createContact() {
    if (this.name !== '') {
      this.provider.createContact(this.name).then (res => {
        this.name = '';
        this.contacts.push(res);
      })
    }
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isLogged = true;
        this.getContact();
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
