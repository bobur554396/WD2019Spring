import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {IContact} from '../shared/models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];

  public contacts: IContact[] = [];
  public loading = false;

  public name: any = '';
  public phone: any = '';

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

  createContact() {
    if (this.name !== '') {
      this.provider.createContact(this.name).then(res => {
        this.name = '';
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
