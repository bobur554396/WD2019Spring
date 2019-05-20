import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IContact} from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contactList: IContact[] = [];
  public loading = false;
  public name: any;
  public phone: any;
  public logged = false;
  public login: any = '';
  public password: any = '';
  public edit = false;
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token){
      this.logged = true;
    }

    if (this.logged) {
      this.provider.getContactList().then(res => {
        this.contactList = res;
        setTimeout(() => {
          this.loading = true;
        }, 2000);
      });
    }
  }

   createContact() {
    if (this.name !== '' && this.phone !== '') {
      this.provider.createContact(this.name, this.phone).then(res => {
        this.name = '';
        this.phone = '';
        this.contactList.push(res);
      });
    }
  }

  updateContact(contact: IContact) {
    this.provider.updateContact(contact).then(res =>
      console.log(contact.name + 'updated'));

    this.edit = false;
  }

  update() {
    this.edit = true;
  }

  deleteContact(contact: IContact) {
    this.provider.deleteContact(contact.id).then(res => {
      console.log(contact.name + 'deleted');
      this.provider.getContactList().then(res => {
        this.contactList = res;
      }, error => {
        console.log(error);
      });

    });
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.logged = true;
        this.provider.getContactList().then(res => {
        this.contactList = res;
        setTimeout(() => {
          this.loading = true;
        }, 2000);
        });
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      localStorage.removeItem('token');
      this.logged = false;
    });
  }
}
