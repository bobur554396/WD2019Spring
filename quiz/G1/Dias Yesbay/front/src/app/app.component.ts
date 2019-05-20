import { Component } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { MainService } from 'src/app/services/main.service';
import {  Contact } from 'src/app/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProviderService, MainService]
})
export class AppComponent {
  public contacts: Contact[] = [];
  name = '';
  phone = 0;
  contact = { name : '', phone: 0 };
  isLogged = false;
  login = '';
  password = '';
  edited: Contact;
  ifEdited = false;

  constructor(private provider: ProviderService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.getcontacts();
    }

  }

  getcontacts = () => {
      this.provider.getcontacts().subscribe(
        data => {
          this.contacts = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  edit(c: Contact){
    this.edited = c;
    this.ifEdited = true;
  }

  createcontact = () => {
    this.contact = { name : this.name, phone: this.phone };

    this.provider.createcontact(this.contact).subscribe(
      data => {
        this.getcontacts();
      },
      error => {
        console.log(error);
      }
    );
  }

  deletecontact = (c: Contact) => {
    this.provider.deletecontact(c.id).subscribe(
      data => {
        this.getcontacts();
      },
      error => {
        console.log(error);
      }
    );
  }

  updatecontact = () => {
    this.provider.updatecontact(this.edited).subscribe(
      data => {
        this.getcontacts();
      },
      error => {
        console.log(error);
      }
    );
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isLogged = true;
        this.getcontacts();
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

