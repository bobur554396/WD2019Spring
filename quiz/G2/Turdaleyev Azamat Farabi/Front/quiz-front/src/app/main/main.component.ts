import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import {IContact,IAuthResponse } from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contactss: IContact[]= [];
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

      this.provider.getContact().then(res=>{
        console.log(res);

        this.contacts = res;
      });
    }
  }


  updatePost(p:IContact){
    this.provider.updateContact(p).then(res => {
      console.log(p.name + 'updated');
    })
  }

  deleteContact(p:IContact){
    this.provider.deleteContact(p.id).then(res =>{
      console.log(p.name + 'deleted');
      this.provider.getContact().then(r =>{
        this.contacts = r;
      });
    });
  }

  auth(){
    if(this.login !== '' && this.password !== ''){
      this.provider.auth(this.login,this.password).then(res =>{
        localStorage.setItem('token',res.token);

        this.logged = true;

        this.provider.getContact().then(r=>{
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
