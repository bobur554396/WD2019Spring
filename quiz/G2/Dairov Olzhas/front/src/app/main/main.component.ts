import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import {IContact} from '../shared/models/models';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {


  public contacts: IContact[];
  public Cont: IContact = {
    id: null,
    name: '',
    phone: '',
    created_by: null
  };
  public logged = false;
  public login: any = '';
  public password: any = '';
  constructor(private provider: ApiService) { }

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
      this.contacts = res;
    });
  }


  createContact() {
    this.provider.createContact(this.Cont).then(res => {
      this.getContacts();
      this.Cont = {
        id: null,
        name: '',
        phone: '',
        created_by: null
      };
    });
  }


  updateContact(contact: IContact) {
    this.provider.updateContact(contact, contact.id).then(res => {
      this.getContacts();
    });
  }


  deleteContact(contact: IContact) {
    this.provider.deleteContact(contact.id).then(res => {
      this.getContacts();
    });
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
    this.provider.logout().then( res => {
      localStorage.clear();
      this.logged = false;
      this.contacts = [];
      this.Cont = {
        id: null,
        name: '',
        phone: '',
        created_by: null
      };
    });
  }
}
