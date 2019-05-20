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
  public contact_detail: IContact;
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
      this.getContact();
    }
  }

  getContact(){
    this.provider.getContact().then(res=>{
      this.contacts= res;
    });
  }

  updateContact(post: IContact){
    this.provider.updateContact(contact.id, contact.name,contact.phone, contact).then(res=>{
      console.log(post.title+ ' updated');
    });
  }
  deleteContact(post: IContact){
    this.provider.deleteContact(post).then(res=>{
      console.log(poss.title+ ' deleted')
      this.provider.getContact().then(r=>{
        this.contacts = r;
      });
    });
  }


  }
  createContact(){
    if(this.name!==''){
      this.provider.createContact(this.name, this.phone).then(res=>{
        this.name = '';
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

        this.getConctact();

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
