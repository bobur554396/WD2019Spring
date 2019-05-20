import { Component, OnInit } from '@angular/core';
import { ProviderService} from '../shared/service/provider.service';
import { IContact } from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public mycontacts: IContact[];
  public logiN: any = '';
  public password: any = '';
  public loggedIn = false;
  public updatePressed = false;


  public contactName: any = "";
  public contactPhone: any="";

  ngOnInit() {
    const token = localStorage.getItem('token')
    if(token){
      this.loggedIn= true;
    }
    if(this.loggedIn){
      this.provider.getContacts().then(res=>{
        this.mycontacts = res;
      })
    }
  }

  pressToVisible(){
    this.updatePressed = !this.updatePressed;
  }

  login() {
    if(this.logiN !=='' && this.password!==''){
      this.provider.login(this.logiN, this.password).then(res=>{
        localStorage.setItem('token', res.token);
        this.loggedIn = true;

        this.provider.getContacts().then(r=>{
          this.mycontacts=r;
        });
      });
    }
  }

  logout(){
    this.provider.logout().then(res=>{
      localStorage.clear();
      this.loggedIn = false;
    })
  }

  getContacts(){
    this.provider.getContacts().then(res=>{
      this.mycontacts = res;
    })
  }

  createContact(){
    if(this.contactName!=='' && this.contactPhone!==''){
      this.provider.createNewContact(this.contactName,this.contactPhone).then(res=>{
        this.mycontacts.push(res);
        this.contactName = "";
        this.contactPhone = "";
      })
    }
  }

  deleteContact(contact: IContact){
    this.provider.deleteContact(contact).then(res=>{
      this.provider.getContacts().then(r=>{
        this.mycontacts = r;
      })
    })
  }

  updateContact(contact: IContact){
    this.provider.updateContact(contact).then(res=>{
      this.provider.getContacts().then(r=>{
        this.mycontacts = r;
      })
    })
  }

}
