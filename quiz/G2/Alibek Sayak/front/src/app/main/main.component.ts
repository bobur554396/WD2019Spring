import { Component, Input, OnInit } from '@angular/core';
import { IContact } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contacts: IContact[] = [];

  public name: any = '';
  public phone: any = '';
  
  public isLogged = false;
  
  public login: any = '';
  public password: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.isLogged = true;
    }
    if(this.isLogged){
      this.getContactList();
    }
  }

  getContactList(){
    this.provider.getContactList().then(res=>{
      this.contacts = res;
    });
  }

  updateContact(t: IContact){
    this.provider.updateContact(t).then(res => {
      console.log(t.name + ' updated');
    });
  }

  deleteContact(t: IContact){
    this.provider.deleteContact(t.id).then(res => {
      console.log(t.name + ' deleted');
      this.provider.getContactList().then(res => {
        this.contacts = res;
      });
    });
  }

  createContact(){
    if(this.name !== '' && this.phone !==''){
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
        this.getContactList();
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
