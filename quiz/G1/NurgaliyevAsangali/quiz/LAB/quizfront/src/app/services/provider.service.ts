import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import {
  IPost,
  IUser,
  IAuthResponse
} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http)
   }

  getPostList(): Promise<IPost[]> {
     return this.get("http://127.0.0.1:8000/api/posts/", {});
   }

  createPost(postTitle: string): Promise<IPost> {
     return this.post("http://127.0.0.1:8000/api/posts/", {
       title: postTitle
     });
   }

  updatePost(post: IPost): Promise<IPost> {
    return this.put(`http://127.0.0.1:8000/api/posts/${post.id}/`, {
      title: post.title
    });
  }

  deletePost(post: IPost): Promise<IPost> {
    return this.delete(`http://127.0.0.1:8000/api/posts/${post.id}/`, {});
  }

  getDetails(post: IPost): Promise<IPost> {
     return this.get(`http://127.0.0.1:8000/api/posts/${post.id}/`, {});
  }

  putLike(post: IPost): Promise<IPost> {
    return this.post(`http://127.0.0.1:8000/api/posts/${post.id}/like/`, {});
  }

  auth(username: any, password: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/api/login/', {
      username: username,
      password: password
    })
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {})
  }
}
