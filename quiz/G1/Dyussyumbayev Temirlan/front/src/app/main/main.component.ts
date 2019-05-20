import { Component, OnInit, Input, Output } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { IContact } from '../models/models'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contactList: IContact[] = [];
  public contactName: string = '';
  public contactPhone: string = '';
  public logged = false;
  public loading = false;

  public username: any = '';
  public password: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if (token) {
      this.logged = true;
    }

    if (this.logged) {
      this.provider.getContactList().then( res => {
        this.contactList = res;
        this.loading = true;
      }); 
    }
  }

  createContact() {
    if (this.contactName != '') {
      this.provider.createContact(this.contactName, this.contactPhone).then( res => {
        this.contactName = '';
        this.contactPhone = '';
        this.contactList.push(res);
      })
    }
  }

  updateContact(contact: IContact) {
    this.provider.updateContact(contact).then( res => {
      
    })
  }

  deleteContact(contact: IContact) {
    this.provider.deleteContact(contact).then( res => {
      this.provider.getContactList().then( res => {
        this.contactList = res;
      })
    })
  }

  auth() {
    if (this.username !== '' && this.password !== ''){
      this.provider.auth(this.username, this.password).then( res => {
        localStorage.setItem('token', res.token);

        this.logged = true;

        this.provider.getContactList().then( res => {
          this.contactList = res;
          this.loading = true;
        }); 
      })
    }
  }

  logout() {
    this.provider.logout().then( res => {
      localStorage.removeItem('token');
      this.username = '';
      this.password = '';
      this.logged = false;
    })
  }
}