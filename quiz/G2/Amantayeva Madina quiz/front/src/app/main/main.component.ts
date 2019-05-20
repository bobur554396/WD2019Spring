import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IContacts } from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public output = '';
  public stringArray: string[] = [];
  public contacts: IContacts[] = [];
  public name: any = '';
  public phone: any = '';
  public logged = false;
  public login: any = '';
  public password: any = '';
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.getContacts();
    }
  }

  getContacts() {
    this.provider.getContacts().then(res => {
      console.log(res);
      this.contacts = res;
    });
  }

  updateContacts(c: IContacts) {
    this.provider.updateContacts(c).then(res => {
      console.log(c.name + ' updated');
    });
  }
  deleteContacts(c: IContacts) {
    this.provider.deleteContacts(c.id).then(res => {
      console.log(c.name + ' deleted');
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });
  }
  createContacts() {
    if (this.name !== '' && this.phone !== '') {
      this.provider.createContacts(this.name, this.phone).then(res => {
        this.name = '';
        this.phone = '';
        this.contacts.push(res);
      });
    }
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.logged = true;
        this.getContacts();
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
