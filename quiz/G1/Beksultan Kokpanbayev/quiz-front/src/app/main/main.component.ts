import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import {IContact,IAuthResponse } from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public contacts: IContact[]= [];
  public name: any = '';

  public logged = false;
  public login: any = '';
  public password:any = '';

  constructor(private provider:ProviderService) { }


  ngOnInit() {

    const token = localStorage.getItem('token');
    if(token){
      this.logged = true;
    }

    if(this.logged){

      this.provider.getContacts().then(res=>{
        console.log(res);

        this.contacts = res;
      });
    }
  }


  // getInfo(contacts:IContact){
  //   this.provider.getInfo(contacts).then(res => {
  //     console.log(res);

  //     // this.contacts = res;
  //   })  
  // }


  updateContact(c:IContact){
    this.provider.updateContact(c).then(res => {
      console.log(c.name + 'updated');
    })
  }

  deleteContact(c:IContact){
    this.provider.deleteContact(c.id).then(res =>{
      console.log(c.name + 'deleted');
      this.provider.getContacts().then(r =>{
        this.contacts = r;
      });
    });
  }

  createContact(){
    if(this.name != ''){
      this.provider.createContact(this.name).then(res =>{
        this.name = '';
        this.contacts.push(res);
      });
    }
  }

  auth(){
    if(this.login !== '' && this.password !== ''){
      this.provider.auth(this.login,this.password).then(res =>{
        localStorage.setItem('token',res.token);

        this.logged = true;

        this.provider.getContacts().then(r=>{
          console.log(r);
  
          this.contacts = r;
        });
      });

      
    }
  }

  logout(){
    this.provider.logout().then(res=>{
      localStorage.clear();
      this.logged = false;
    });
  }
}
