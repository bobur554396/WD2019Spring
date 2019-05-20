import { Component, OnInit, Input, Output } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { IPost } from '../models/models'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public postList: IPost[] = [];
  public currentPost: IPost;
  public currentPostTitle: string = '';
  public postTitle: string = '';
  public logged = false;
  public loading = false;
  public flag = false;

  public username: any = '';
  public password: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if (token) {
      this.logged = true;
    }

    if (this.logged) {
      this.provider.getPostList().then( res => {
        this.postList = res;
        this.loading = true;
      }); 
    }
  }

  getDetails(post: IPost) {
    this.flag = true;
    this.currentPost = post;
  }

  putLike(post: IPost) {
    this.provider.putLike(post).then( res => {
      post.like_count = res.like_count;
    })
  }

  createPost() {
    if (this.postTitle != '') {
      this.provider.createPost(this.postTitle).then( res => {
        this.postTitle = '';
        this.postList.push(res);
      })
    }
  }

  updatePost(post: IPost) {
    this.provider.updatePost(post).then( res => {
      console.log(`${post.title} updated`);
    })
  }

  deletePost(post: IPost) {
    this.provider.deletePost(post).then( res => {
      console.log(`${post.title} deleted`);
      this.provider.getPostList().then( res => {
        this.postList = res;
      })
    })
  }

  auth() {
    if (this.username !== '' && this.password !== ''){
      this.provider.auth(this.username, this.password).then( res => {
        localStorage.setItem('token', res.token);

        this.logged = true;

        this.provider.getPostList().then( res => {
          this.postList = res;
          this.loading = true;
        }); 
      })
    }
  }

  logout() {
    this.provider.logout().then( res => {
      localStorage.removeItem('token');
      this.username = '';
      this.password = '';
      this.logged = false;
    })
  }

}
