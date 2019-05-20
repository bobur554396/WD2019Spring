import { Component, OnInit } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';
import {Contact} from './models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { INT_TYPE } from '@angular/compiler/src/output/output_ast';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-front';
  public contacts: Contact[] = [];
  public logged = false;
  public newname: string;
  public newphone: string;
  public currentuser: number;
  public editId: number;
  public login: any = '';
  public password: any = '';
  public loading = false;
  constructor(private apiService: BackendApiService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.editId = -1;
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.apiService.getPostList().then(res => {
        this.contacts = res;
        setTimeout(() => {
          this.loading = true;
        }, 2000);
      });
    }
  }

  putDetailPost(c: Contact) {
    this.apiService.putDetailPost(c);
    alert('done:)');
    this.editId = -1;
  }
  deleteItem(value) {
    this.apiService.deleteTaskList(value);
    for (let i = 0 ; i <= this.contacts.length; i++) {
      if (value === this.contacts[i]) {
       this.contacts.splice(i, 1);
      }
    }
  }
  makeEditable(id) {
    this.editId = id;
  }
  auth() {
    if (this.login !== '' && this.password !== '') {
      this.apiService.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);

        this.logged = true;
        this.currentuser = 1;
        this.apiService.getPostList().then(r => {
          this.contacts = r;
          setTimeout(() => {
            this.loading = true;
          }, 2000);
        });

      });
    }
  }
  newContact() {
    if (this.newname !== '' && this.newphone !== '') {
      const contact = new Contact();
      contact.name = this.newname;
      contact.phone = this.newphone;
      contact.createdby = this.currentuser;
      this.apiService.createPost(contact).then( res => {
        this.contacts.push(res);
      });
      // this.contacts.push(contact);
      alert('done:)');
    }
  }
  logout() {
    this.apiService.logout().then(res => {
      localStorage.clear();
      this.logged = false;
    });
  }
}
