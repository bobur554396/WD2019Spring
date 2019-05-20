import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {Post , Token} from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  login(usernamE: string, passworD: string): Promise<Token> {
    return this.post('http://localhost:8000/api/login/', {
      username: usernamE,
      password: passworD
    });
  }
  getPosts(): Promise<Post[]> {
    return this.get('http://localhost:8000/api/contacts/', {});
  }
  deletePost(post: Post) {
    return this.delet('http://localhost:8000/api/contacts/' + post.id + '/', {});
  }

}
