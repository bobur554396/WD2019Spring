import { Component, OnInit } from '@angular/core';
import { ProviderService } from './services/provider.service';
import { IContact } from './models/contact';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public contact: IContact[]=[];
  public loading = false;


  public name: any='';
  public logged = false;

  public login:any='';
  public password:any='';


  constructor(private provider: ProviderService) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    if(token){
      this.logged=true;
    }
    if(this.logged){
      this.provider.getContacts().then(res =>{
        this.contact = res;
        setTimeout( () => {
          this.loading=true;
        }, 2000);
      });
    }

  }

  updateContacts(c: IContact){
    this.provider.updateContacts(c).then(res =>{
      console.log(c.name+'updated');
    });
  }

  deleteContacts(c: IContact){
    this.provider.deleteContacts(c.id).then(res => {
      console.log(c.name + 'deleted');
      this.provider.getContacts().then( res => {
        this.contact = res;
      })
    })
  }

  createContacts(){
    if(this.name !== '') {
     this.provider.createContacts(this.name).then( res => {
      this.name = '';
      this.contact.push(res);
      })
    }
  }

  auth() {
    console.log(this.login+" "+this.password);
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        console.log(res);

        this.logged = true;

        this.provider.getContacts().then(r => {
          this.contact = r;
          setTimeout(() => {
            this.loading = true;
          }, 2000);
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
