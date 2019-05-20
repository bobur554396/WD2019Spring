import { Component } from '@angular/core';
import { ProviderService } from './shared/services/provider.service';
import { IContact } from './shared/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  public login: any = '';
  public password: any = '';

  public newName: any = '';
  public newPhone: any = '';

  public wantupdate = false;

  public logged = false;
  public contacts: IContact[] = [];

  public currentContact: IContact;

  constructor(private provider: ProviderService) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    this.wantupdate = false;
    if (token) {
      this.logged = true;
      this.getContacts();
    }
    // this.getContacts();
    if ( this.logged) {
      this.getContacts();
    }
    this.newName = '';
    this.newPhone = '';

  }

  createCont() {
    this.provider.createContact(this.newName, this.newPhone).then(res => {
      location.reload();
    });
  }

  updateCont() {
    this.provider.updateContact(this.currentContact).then(res => {
      this.currentContact = res;
    });
  }

  makeUpdatable(item: IContact) {
    this.wantupdate = true;
    this.currentContact = item;
  }

  deleteContact(item: IContact) {
    this.provider.deleteContact(item).then(res => {
      location.reload();
    });
  }

  getContacts() {
    this.provider.getContacts().then(res => {
      this.contacts = res;
      console.log(res);
    });
  }


  authorize() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        if (localStorage.getItem('token')) {
          this.logged = true;
          this.getContacts();
        }
        alert('welcome,' + localStorage.getItem('username'));
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.logged = false;
      localStorage.clear();
      this.login = '';
      this.password = '';
    });
  }
}
