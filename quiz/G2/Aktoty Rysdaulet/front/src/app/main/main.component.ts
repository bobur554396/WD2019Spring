import { Component, OnInit } from '@angular/core';
import { IContact } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public contacts: IContact[] = [];
  public loading = false;
  public name: any='';
  public phone: any='';
  public isLogged = false;
  public login: any='';
  public password: any='';


  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }

    if(this.isLogged){
      this.getContacts();
    }

  }

  getContacts(){
    this.provider.getContacts().then(res =>{
      this.contacts = res;
      setTimeout( () => {
        this.loading=true;
      }, 1000);
    }); 
  }


  updateContacts(c: IContact){
    this.provider.updateContacts(c).then(res =>{
      console.log(c.name+' updated');
    });
  }

  deleteContacts(c: IContact){
    this.provider.deleteContacts(c.id).then(res => {
      console.log(c.name + ' deleted');
      this.provider.getContacts().then( res => {
        this.contacts = res;
      })
    })
  }

  createContacts(){
    if(this.name !== '' &&  this.phone !== '') {
    this.provider.createContacts(this.name, this.phone).then( res => {
      this.name = '';
      this.phone = '';
      this.contacts.push(res);
      })
    }
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