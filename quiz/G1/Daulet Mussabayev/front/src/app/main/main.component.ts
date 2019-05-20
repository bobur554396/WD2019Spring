import { Component, OnInit } from '@angular/core';
import {IContacts} from '../shared/models/models';
import {ProviderService} from '../shared/services/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public contacts: IContacts[] = [];
  public name: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getContactList().then(res => {
      this.contacts = res;
    });
  }

  getTasks(contact: IContacts) {
    this.provider.getContacts(contact).then(res => {
      this.contacts = res;
    });
  }

  updateContacts(t: IContacts) {
    this.provider.updateContact(t).then(res => {
      console.log(t.name + ' updated');
    });
  }

  deleteContacts(t: IContacts) {
    this.provider.deleteContact(t.id).then(res => {
      console.log(t.name + ' deleted');
      this.provider.getContactList().then(r => {
        this.contacts = r;
      });
    });
  }

}
