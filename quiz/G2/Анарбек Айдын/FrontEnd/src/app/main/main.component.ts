import { Component, OnInit } from '@angular/core';
import {  Contact } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public t_ls: Contact[] = []
  constructor(private provider: ProviderService) { }

  ngOnInit() {

    this.provider.getcontacts().then(res => {this.t_ls = res;});

  }

 

}
