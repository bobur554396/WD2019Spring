import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProviderService} from './services/provider.service';
import {Contact} from './models/model';
import { loadInternal } from '@angular/core/src/render3/util';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contacts:Contact[]=[];
  public curList:Contact;
  
  public updated_name='';
  public name='';
  public task_name='';
  public newTask=false;

  public logged = false;

  public login: any = '';
  public password: any = '';
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    localStorage.clear();
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }

    if (this.logged) {
      this.provider.getContacts().then(res=>{
        this.contacts=res;
    });
  }
  }
  
  

  deleteList(li:Contact){
    this.provider.deleteList(li.id).then(res=>{
      console.log(li.name+"deleted");
      this.provider.getContacts().then(r=>{
        this.contacts=r;
      });
    });
  }

  canUp(c:Contact){
    var l=document.getElementById(c.id+"");
    var i=document.getElementById(c.name).getElementsByTagName("img")[1];
   
    if(l.style.getPropertyValue("visibility")!="visible"){
      l.style.setProperty("visibility","visible");
      i.setAttribute("src","../../assets/update.png");
    }else{
      l.style.setProperty("visibility","hidden");
      i.setAttribute("src","../../assets/update.png");

    }
    console.log(l);
  }
    
  updateList(c: Contact) {
      this.canUp(c);
      if(this.updated_name!=''){
        c.name=this.updated_name;
        this.updated_name='';
        this.provider.updateList(c).then(res => {
        console.log(c.name);
      });
      
    }
    }
  

  logIn() {
    if (this.login !== '' && this.password !== '') {
      this.provider.logIn(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);

        this.logged = true;

        this.provider.getContacts().then(r => {
          this.contacts = r;
        });

      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.logged = false;
    });
  }
  
}