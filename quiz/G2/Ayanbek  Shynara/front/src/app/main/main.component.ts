import { Component, OnInit } from '@angular/core';
import {ProviderService} from './services/provider.service'
import {IContact, IUser } from './models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class AppComponent {
  provider:ProviderService;
  public authorized = false;

  public login:any = '';
  public password:any = ''; 

  constructor(private prov: ProviderService) {
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authorized = true;
    }

    if (this.authorized) {
      console.log(token);
    }
    auth() {
      if (this.login !== '' && this.password !== '') {
        console.log(this.login + this.password);
        this.provider.auth(this.login, this.password).then(res => {
          localStorage.setItem('token', res.token);
          this.authorized = true;
          //getPosts
        });
      }
    }
  
    logout() {
      this.provider.logout().then(res => {
        this.authorized = false;
        localStorage.clear();
      });
    }
  }
  

}
