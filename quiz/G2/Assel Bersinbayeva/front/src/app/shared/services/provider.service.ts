import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { ITaskList, ITask } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) { 
    super(http);
  }

  getTaskLists(): Promise<ITaskList[]>{
    // return this.get('http://127.0.0.1:8000/api/tasklist/', {});
    return this.get('http://localhost:8000/api/tasklist/', {});
  }

  getTasks(tasklist: ITaskList): Promise<ITask[]>{
    return this.get(`http://127.0.0.1:8000/api/tasklist/${tasklist.id}/tasks/`, {});
  }

  updateTaskList(tasklist: ITaskList): Promise<ITaskList>{
    return this.put(`http://localhost:8000/api/tasklist/${tasklist.id}/`,{
      name: tasklist.name
    });
  }

  deleteTaskList(id: number) : Promise<any>{
    return this.delet(`http://localhost:8000/api/tasklist/${id}/`,{});
  }

  createTaskList(name: any) : Promise<ITaskList>{
    return this.post(`http://localhost:8000/api/tasklist/`, {
      name: name
    });
  }
}
