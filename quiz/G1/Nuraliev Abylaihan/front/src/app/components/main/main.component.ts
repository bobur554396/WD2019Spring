import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/services/models/model';
import { ProviderService } from 'src/app/services/shared/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css','./bootstrap.css']
})
export class MainComponent implements OnInit {


  public contacts: IContact[] = []

  public name: any = '';
  public phone: any = '';



  public login:any = '';
  public password:any = '';
  public logged = false;
  constructor(private provider: ProviderService) { }

  ngOnInit() {

    
    if (this.logged) {
      this.provider.getContacts().then(res => {this.contacts = res;});
      }
      

  }

  createContact() {
    if (this.name !== '' && this.phone !== '') {
      this.provider.createContact(this.name,this.phone).then(res => {
        this.name = '';
        this.phone = '';
        this.contacts.push(res);
      });
    }
  }

  updateContact(contact: IContact) {
    this.provider.updateContact(contact).then(res => {
      console.log(contact.name + ' updated');
      console.log(contact.id);

    });
  }

  deleteContact(contact: IContact) {
    console.log(contact);
    this.provider.deleteContact(contact).then(res => {
      console.log(contact.name + ' deleted');
      
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });

  }


  auth() {
    if(this.login!=='' && this.password!==''){
      this.provider.auth(this.login,this.password).then(r => {
        localStorage.setItem('token', r.token);
    });
    this.logged=true;
    this.provider.getContacts().then(res => {this.contacts = res;});
      }
  }


  logout() {
    this.provider.logout().then(res => { localStorage.clear();this.logged = false;});
  }

}
