import { Component, OnInit } from '@angular/core';
import { IContactlist} from '../shared/module/modules';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public contactlist: IContactlist[]= [];
  public logged = false;
  public name: any = '';
  public login: any = '';
  public password: any = '';



  constructor(private provider:ProviderService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token){
      this.logged = true;
    }
    if (this.logged){
      this.provider.getContactList().then(res=>{
      console.log(res);

      this.contactlist = res;
      });
    }
  }
 
  auth(){
    if(this.login !=='' && this.password !==''){ 
      this.provider.auth(this.login, this.password).then(res=>{
        localStorage.setItem('token', res.token);
        this.logged= true;
        this.provider.getContactList().then(r=>{
          console.log(r);
    
          this.contactlist = r;
        });
      });
    }
  }



    
  
}
