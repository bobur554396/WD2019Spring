import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {IContact} from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  public contacts: IContact[] = [];
  public loading = false;
  public username='';
  public name: any = '';

  public logged = false;

  public login: any = '';
  public password: any = '';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }

    if (this.logged) {
      this.provider.getContacts().then(res => {
        this.contacts= res;
          this.loading = true;
      });
    }
  }

 updateContact(c: IContact) {
    this.provider.updateContact(c, c.name, c.phone).then(res => {
      console.log(c.name + ' updated');
    });
  }

  deleteContact(c: IContact) {
    this.provider.deleteContact(c).then(res => {
      console.log(c.name + ' deleted');
      this.provider.getContacts().then(r => {
        this.contacts= r;
      });
    });
  }

 

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        

        this.logged = true;

        this.provider.getContacts().then(r => {
          this.contacts = r;
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