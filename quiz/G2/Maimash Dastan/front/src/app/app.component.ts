import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  name="hello";
  arrays=[1,2,3,4,5];
  title = 'todo-front';
}
