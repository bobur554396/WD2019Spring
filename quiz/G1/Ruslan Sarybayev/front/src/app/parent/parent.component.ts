import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {ICnt} from '../shared/models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];

  public contacts: ICnt[] = [];
  public loading = false;

  public name: any = '';

  public phone: any = '';

  public logged = false;

  public login: any = '';
  public password: any = '';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {

    // this.logged =true;

    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    
    }

    if (this.logged) {
      this.provider.getContacts().then(res => {
        this.contacts = res;
        setTimeout(() => {
          this.loading = true;
        }, 2000);
      });
    }

  }



  updateContact(c: ICnt) {
    this.provider.updateContact(c).then(res => {
      console.log(c.name + ' updated');
    });
  }

  deleteContact(c: ICnt) {
    this.provider.deleteContact(c.id).then(res => {
      console.log(c.name + ' deleted');
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });
  }

  createContact() {
    if (this.name !== '' && this.phone) {
      this.provider.createContact(this.name, this.phone).then(res => {
        this.name = '';
        this.phone = '';
        this.contacts.push(res);
      });
    }
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
