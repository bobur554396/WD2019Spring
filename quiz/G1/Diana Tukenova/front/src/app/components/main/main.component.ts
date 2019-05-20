import {Component, OnInit, Provider} from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {Post} from '../../models/model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private provider: ProviderService) { }
  public posts: Post[];
  public username: string;
  public password: string;
  public loggedIn = false;
  public detailed = false;
  ngOnInit() {
    this.getPosts();
  }

  expand() {
    this.detailed = !this.detailed;
  }
  login() {
    this.provider.login(this.username, this.password).then( res => {
      console.log(res.token);
      localStorage.setItem('token', res.token);
    });
    this.loggedIn = true;
  }

  getPosts() {
    this.provider.getPosts().then( res => {
      this.posts = res;
    });
  }
  deletePost(post: Post) {
    this.provider.deletePost(post).then(res => {
      this.provider.getPosts().then(r => {
        this.posts = r;
      });
    });
  }

}
