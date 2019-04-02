import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() title = 'Hello World!';
  @Input() array = [];

  @Output() subTitle = new EventEmitter();
  @Output() array2 = new EventEmitter<any[]>();

  constructor() {
  }

  ngOnInit() {
  }

  pushData() {
    this.subTitle.emit('Message sent!');
  }

  pushData2() {
    this.array2.emit([1, 2, 3, 4, 5, 6]);
  }


}
