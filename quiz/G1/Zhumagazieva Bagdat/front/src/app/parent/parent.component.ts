import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IContact } from '../shared/models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public title: any ='';
  public contacts: IContact[] =[]
  public name: any='';
  public phone: any ='';
  public isLogged = false;
  public login = '';
  public password = '';


  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }

    if (this.isLogged) {
      this.provider.getContact().then(res => {
        this.contacts = res;
      })
    }
    

  }

  getContact(){
    this.provider.getContact().then(res => {
      this.contacts = res;
    })
  }


  updateContact(c: IContact) {
    this.provider.updateContact(c).then(res => {
      console.log(c.name+' updated');
      this.provider.getContact().then(r => {
        this.contacts = r;
      });
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
    if (this.name !== '' && this.phone !== '') {
      this.provider.createContact(this.name, this.phone).then(res => {
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
