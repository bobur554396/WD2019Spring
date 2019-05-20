import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {IContact} from '../shared/models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];

  public contacts: IContact[] = [];
  public loading = false;

  public name: any = '';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    this.provider.getContacts().then(res => {
      this.contacts = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    });
  }


  createCont() {
    if (this.name !== '') {
      this.provider.createContact(this.name).then(res => {
        this.contacts.push(res);
        this.name = '';
      });
    }
  }

  deleteCont(c: IContact) {
    this.provider.deleteContact(c.id).then(res => {
      console.log(c.name + ' deleted');
      this.provider.getContacts().then(r => {
        this.contacts = r;
      });
    });
  }

  updateCat(c: IContact) {
    this.provider.updateCategory(c).then(res => {
      console.log(c.name + ' updated');
    });
  }

}