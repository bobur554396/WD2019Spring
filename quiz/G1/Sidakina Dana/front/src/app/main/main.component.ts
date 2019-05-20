import { Component, OnInit } from '@angular/core';
import { IContact } from './models/model';
import { ProviderService } from './services/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public contacts: IContact[]=[];
  public contact:IContact;
  public info=false;
  public liked=false;
  public logged=true;
  public login:any="";
  public password:any="";


  constructor(private provider: ProviderService) { }

  ngOnInit() {
    // const token=localStorage.getItem('token');
    // if(token){
    //   this.logged=true;
    // }
    // if(this.logged ){
    //   this.provider.getContacts().then(res =>{
    //     this.contacts = res;
    //     setTimeout( () => {
    //     }, 2000);
    //   });
    // }
    this.provider.getContacts().then(res =>{
          this.contacts = res;
          setTimeout( () => {
          }, 2000);
        });
    
  }
  getContact(contact:IContact){
    this.provider.getContactInfo(contact.id).then(res =>{
      this.contact=res;
      this.info=true;
    });
  }
  delContact(contact:IContact){
    this.provider.deleteContact(contact.id).then(res=>{
      console.log(contact.name+'deleted');
      this.provider.getContacts().then(res =>{
        this.contacts=res;
      })
    })
  }
  updateContact(contact:IContact){
    this.provider.updContact(contact).then(res=>{
    })
  }
  // likePost(post:IPost){
  //   this.provider.likingPost(post.id).then(res=>{
  //     console.log(post.like_count);
  //     this.provider.getPostInfo(post.id).then(res=>{
  //       this.post=res;
  //     })
  //   })
  // }
  auth() {
    console.log(this.login+" "+this.password);
    if (this.login !== '' && this.password !== '') {
        this.provider.auth(this.login,this.password).then(res => {
        localStorage.setItem('token', res.token);
        console.log(res);
        this.logged = true;
        this.provider.getContacts().then(r => {
          this.contacts = r;
          setTimeout(() => {
          }, 2000);
        });

      });
    }
  }
  logout(){
    this.provider.logout().then(res=>{
      localStorage.clear();
      this.logged=false;
      this.info=false;
    })
  }

}
