import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {Contact} from '../models/models'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public contacts:Contact[]=[];
  public name: any;
  public phone:any;
  public login:any = '';
  public password:any='';
  public logged = false;

  constructor(private provider:ProviderService) { }

  ngOnInit() {
    this.getContacts();
    }
    getContacts(){
      this.provider.getContacts().then(res=>{
        this.contacts = res;
      });
    }
    updateContact(c:Contact){
      this.provider.updateContacts(c).then(res=>{
        console.log(c.name + "   updated")
      })
    }
    deleteContact(c:Contact){
      this.provider.deleteContacts(c.id).then(res=>{
        console.log(c.name + "  deleted");
        this.provider.getContacts().then(r=>{
          this.contacts = r;
        })
      })
    }
    createContact(){
      if(this.name!=='' && this.phone!==''){
        this.provider.createContact(this.name,this.phone).then(res=>{
          this.name = '';
          this.phone = '';
          this.contacts.push(res);
        });
      }
    }

    auth(){
      if(this.login !== '' && this.password !== '' ){
        console.log("asd");
        this.provider.auth(this.login,this.password).then(res=>{
          localStorage.setItem('token',res.token);
          this.logged = true;
          this.getContacts();
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
  

