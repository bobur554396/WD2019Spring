import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import {IContact} from '../shared/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  public contacts: IContact[]=[];
  public contact_current: IContact;
  public name: any='';
  public phone: any='';
  public contact_id: number;

  public isLogged= false;
  public login = '';
  public password = '';
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.isLogged= true;
    }
    if(this.isLogged){
      this.getContacts();
    }
  }

  getContacts(){
    this.provider.getContacts().then(res=>{
      this.contacts= res;
    });
  }
  updateContact(contact: IContact){
    this.provider.updateContact(contact.name, contact.phone, contact).then(res=>{
      console.log(contact.name+ ' updated');
    });
  }
  deleteContact(contact: IContact){
    this.provider.deleteContact(contact).then(res=>{
      console.log(contact.name+ ' deleted')
      this.provider.getContacts().then(r=>{
        this.contacts = r;
      });
    });
  }
  createContact(){
    if(this.name!==''){
      this.provider.createContact(this.name, this.phone).then(res=>{
        this.name = '';
        this.phone='';
        this.contacts.push(res);
      });
    }
  }
  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        console.log(res);
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
