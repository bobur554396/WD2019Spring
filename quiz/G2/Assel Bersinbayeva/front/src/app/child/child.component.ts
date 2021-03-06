import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() title = '';
  @Input() numberArray: number[] = [];

  @Output() output = new EventEmitter();
  @Output() stringArray = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  sendMessage(){
    this.output.emit('msg from child');
  }

  sendStringArray(){
    this.stringArray.emit(['a', 'b', 'c']);
  }


}
