import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { Contact } from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public contacts: Contact[] = [];

  public name: any = '';
  public phone: any = '';

  public login: any = '';
  public password: any = '';

  public logged = false;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }

    if(this.logged){
    this.provider.getContacts().then(res=>{
      this.contacts= res;
      });
    }
  }

  createContact(){
    if(this.name !== ''){
      this.provider.createContact(this.name, this.phone).then(res=>{
        this.name = '';
        this.phone = '';
        this.contacts.push(res);
      });
    }
  }
  updateContact(c: Contact){
    this.provider.updateContact(c).then(res =>{
       console.log(c.name + 'updated');
       console.log(c.phone + 'updated' )
    });
  }

  deleteContact(c: Contact){
    this.provider.deleteContact(c.id).then(res=>{
         console.log(c.name + "deleted");
    this.provider.getContacts().then(r=>{
      this.contacts = r;
    });
  });
  }


  auth(){
    if(this.login !== '' && this.password !==''){
      this.provider.auth(this.login, this.password).then(r=>{
        localStorage.setItem('token', r.token);
        this.logged = true;
        this.provider.getContacts().then(res=>{
          this.contacts= res;
          });
      });
    }
  }

  logout(){
    this.provider.logout().then(res=>{
      localStorage.clear();
      this.logged = false;
    })
  }
}
