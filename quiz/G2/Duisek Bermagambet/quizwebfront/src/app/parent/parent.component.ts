import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IContact } from '../shared/models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  
  public currentlogin: any = '';
  public currentpassword: any = '';

  public name: any = '';
  public loggedin = false;
  public deletable = false;
  public updatable = false;
  public contacts: IContact[] = [];

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    if(this.loggedin){
      this.provider.getContacts().then(res => {
        this.contacts = res;
      })
    }
  }

  updateContact(contact: IContact){
    this.provider.updateContact(contact).then(res=>{
      if(!this.updatable)
        this.updatable = true;
      else
        this.updatable = false;
    });
  }

  deleteContact(contact: IContact ){
    this.provider.deleteContact(contact.id).then(res=>{
      this.provider.getContacts().then(r=>{
        this.contacts = r;
      });
    });
  }

  createContact(){
    if(this.name != '') {
      this.provider.createContact(this.name).then(res=>{
        this.name = '';
        this.contacts.push(res);
      });
    }
  }

  
  auth(){
    if (this.currentlogin != '' && this.currentpassword != '') {
      this.provider.auth(this.currentlogin, this.currentpassword).then(res=>{
        localStorage.setItem('token', res.token);
        this.loggedin = true;
        this.getContacts();
      });
    }
  }

  deauth() {
    this.provider.logout().then(res=>{

      localStorage.setItem('token', '');
      this.loggedin = false;
    })
  }
  getContacts() {
    this.provider.getContacts().then(res => {
      this.contacts = res;
    });
  }
}
