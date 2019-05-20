import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-other',
  template:`<h1>hello my boss!!</h1>`,
  styleUrls: ['./other.component.styl']
})
export class OtherComponent implements OnInit {
  message:string;
 
  constructor(private provider:ProviderService) {

   }

  ngOnInit() {
    this.provider.sendMessage.subscribe(res=>{
      this.message=res;
     
    });

    
  }

}
