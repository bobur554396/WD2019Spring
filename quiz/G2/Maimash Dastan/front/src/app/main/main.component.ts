import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { Users,Posts } from '../shared/models/models';
import { ok } from 'assert';
import { userInfo } from 'os';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {
  
  @Output() output=new EventEmitter;
  @Input() arrayInt:[]=[];
  public users:Users[]=[];
  public login:string;
  public password:string;
  
  public user:Users;
  public posts:Posts[]=[];
  public name:string;
  public surname:string;
  public age :number;
  ok:boolean=false;
  ok1:boolean=false;
  private provider1:ProviderService;
  ok2:boolean=false;
  logged:boolean=true;
  constructor(private provider:ProviderService) {
 }
  ngOnInit() {


    
  }



  
  
  login1(){
    this.provider.loginIn(this.login,this.password).then(res=>{
      this.user=res;
      this.logged=false;
    });
  }
  logout(){
    this.provider.logOut(this.login,this.password).then(res=>{
      this.logged=true;
    });
  }

}
