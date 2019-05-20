import { Component, OnInit } from '@angular/core';
import {IContacts} from "../shared/models/models";
import {ProviderService} from "../shared/services/provider.service";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  public contacts:IContacts[] = [];



  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.
  }

}
