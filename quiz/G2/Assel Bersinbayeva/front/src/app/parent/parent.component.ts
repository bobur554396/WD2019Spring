import { Component, Input, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { ITaskList, ITask } from '../shared/models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];
  public tasklists: ITaskList[] = [];
  public tasks: ITask[] = [];
  public name: any = '';
  public loading = false;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.tasklists = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    });
  }

  getTasks(tasklist: ITaskList) {
    this.provider.getTasks(tasklist).then(res => {
      console.log(res);
      this.tasks = res;
    });
  }
  updateTaskList(t: ITaskList) {
    this.provider.updateTaskList(t).then(res => {
      console.log(t.name + ' updated');
    });
  }
  deleteTaskList(t: ITaskList) {
    this.provider.deleteTaskList(t.id).then(res => {
      console.log(t.name + ' deleted');
      this.provider.getTaskLists().then(res => {
        this.tasklists = res;
      });
    });
  }
  createTaskList() {
    if (this.name !== '') {
      this.provider.createTaskList(this.name).then(res => {
        this.name = '';
        this.tasklists.push(res);
      });
    }
  }





}
