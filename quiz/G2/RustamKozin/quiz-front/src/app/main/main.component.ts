import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ProviderService } from '../shared/services/provider.service'
import {IContact} from '../shared/models/models';
import { and } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];

  public contacts: IContact[] = [];
  public loading = false;

  public phone:any='';
  public name: any = '';

  public isLogged = false;

  public login = '';
  public password = '';

  constructor(private provider: ProviderService) {
  }

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
      this.loading = true;
    });
  }


  sendMessageByService() {
    this.provider.sendMessage.emit('This message From Parent Component');
  }

  updateContact(c: IContact) {
    this.provider.updateContact(c).then(res => {
      console.log(c.name + ' updated');
    });
  }

  deleteContact(c: IContact) {
    this.provider.deleteContact(c.id).then(res => {
      console.log(c.name + ' deleted');
      this.provider.getContact().then(r => {
        this.contacts = r;
      });
    });
  }

  createContact(c: IContact) {
    if (c.name !== '',c.phone!=='') {
      this.provider.createContact(c).then(res => {
      c.name = '';
      c.phone='';
        this.contacts.push(res);
      });
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
