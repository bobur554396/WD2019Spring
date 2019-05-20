import { Component, OnInit } from '@angular/core';
import { Post,User } from '../models/model';
import {ProviderService} from '../services/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public Posts: Post[] = [];
  
  public name = '';
  public targetPost: Post;
  public username = '';
  public password = '';
  public logged = false;
  constructor(private provider: ProviderService) { }

  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    if (this.logged) {
      this.provider.getPosts().then(res => {
        this.Posts = res;
      });
    
  }
  }


createPost() {
    if (this.name !== '') {
      this.provider.createPost(this.name).then(res => {
        this.name = '';
        this.Posts.push(res);
      });
    }
}

updatePost(post: Post) {
  this.provider.updatePost(this.targetPost).then(res => {});
}

deletePost(post: Post) {
  this.provider.deletePost(this.targetPost).then(res => {
    this.provider.getPosts().then(r => {
      this.Posts = r;
    });
  });
}}

login() {
  if (this.username !== '' && this.password !== '') {
    console.log(this.username);
    console.log(this.password);
    this.provider.auth(this.username, this.password).then(res => {
      console.log(res.token);
      localStorage.setItem('token', res.token);
      this.logged = true;

      this.provider.getTaskLists().then(r => {
        this.taskLists = r;
      });

    });
  }

logout() {
  this.provider.logout().then(res => {
    localStorage.clear();
    this.logged = false;
  });
}}