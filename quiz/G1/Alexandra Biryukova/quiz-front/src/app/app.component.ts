import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from './services/provider.service';
import { IContact } from './models/models';
import { range } from 'rxjs';
import { preserveWhitespacesDefault } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'quiz-front';
  public contacts:IContact[]=[];
  public up=false;
  public username='';
  public password='';
  public name='';
  public phone='';
  public cr=false;
  public current:IContact;
  public logged=false;
  constructor(private provider:ProviderService){

  }
  ngOnInit(){
    const token = localStorage.getItem('token');
    
    if (token) {
      this.logged = true;
    }
    if(this.logged){
      this.provider.getContacts().then(res=>{
        this.contacts=res;
      }
      );
    }
    // location.reload();
    
  }
  logIN(){
    if(this.password!=='' &&this.username!==''){
      this.provider.logIn(this.username,this.password).then(res=>{
        localStorage.setItem('token', res.token);
        localStorage.setItem('username',res.username);
        this.logged = true;
        this.provider.getContacts().then(res=>{
          this.contacts=res;
        }
        );
      });
      
    }
    
  }
  logout(){
    this.provider.logout().then(res=>{
      localStorage.clear();
      this.username='';
      this.password='';
      this.logged=false;
    });
  }
  update(c:IContact,e: Event){
    var l=(e.target as Element);
      console.log(l.parentElement);
      var el=l.parentElement.getElementsByTagName("input");
    if(this.up==false){
      console.log(el.length);
      
      var i=0;
      while(i!=el.length){
        el.item(i).removeAttribute("disabled");
        i++;
        console.log(i);
      }
    this.current=c;
    this.up=true;
    }else{
      this.save(el);
    }
  }
  save(el:HTMLCollection){
    if(this.current.name!=''&&this.current.phone!=''){
      this.provider.update(this.current).then(res=>{
        this.current=res;
        this.up=false;
        var i=0;
        while(i!=el.length){
          el.item(i).setAttribute("disabled","true");
          i++;
          console.log(i);
        }
      });
  }
  }
  delete(c:IContact){
    this.provider.deleteContact(c).then(res=>{
      this.provider.getContacts().then(r=>{
        this.contacts=r;
      });
    });
  }
  crPer(){
    this.cr=true;
  }
  create(){
    if(this.name!=''&& this.phone!=''){
      this.provider.create(this.name,this.phone).then(res=>{
        this.contacts.push(res);
      });
      this.cr=false;
      this.name='';
      this.phone='';
    }
  }
  back(){
    this.cr=false;
  }
  
}
