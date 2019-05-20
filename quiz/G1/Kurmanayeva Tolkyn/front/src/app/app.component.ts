import { Component } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { MainService } from 'src/app/services/main.service';
import {  Contact} from 'src/app/models/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProviderService, MainService]
})
export class AppComponent {
  public contacts: Contact[] = [];
  name = '';
  phone = '';

  contact = { name : this.name, phone: this.phone };
 
  isLogged = false;

  login = '';
  password = '';

  constructor(private provider: ProviderService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }
    this.getContacts();

  }

  getContacts = () => {
      this.provider.getContacts().subscribe(
        data => {
          this.contacts = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  createContact = () => {
    this.contact = { name : this.name, phone: this.phone };

    this.provider.createContact(this.contact).subscribe(
      data => {
        this.getContacts();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteContact = (c: Contact) => {
    this.provider.deleteContact(c.id).subscribe(
      data => {
        this.getContacts();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateContact = (c: Contact) => {
    this.provider.updateContact(c).subscribe(
      data => {
        this.getContacts();
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
        this.getContacts();
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
