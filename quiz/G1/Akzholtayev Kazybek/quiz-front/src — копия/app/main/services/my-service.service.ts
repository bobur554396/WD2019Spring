import { Injectable } from '@angular/core';
import {ExService} from './ex.service';
import {HttpClient} from '@angular/common/http';
import {ITask,ITaskList, IAuthResponse} from '../models/todo'
@Injectable({
  providedIn: 'root'
})
export class MyServiceService extends ExService {

  constructor(http:HttpClient) {
    super(http);
   }
   getTaskLists(): Promise<ITaskList[]>{
     return this.get(`http://127.0.0.1:8000/api/task_lists/`,{});
   }
   getExactList(id: number): Promise<ITaskList>{
     return this.get(`http://127.0.0.1:8000/api/task_lists/${id}/`,{id});
   }
   getTasks(id: number): Promise<ITask[]> {
    return this.get(`http://127.0.0.1:8000/api/task_lists/${id}/tasks/`, {id});
  }
  createList(name:any):Promise<ITaskList>{
    return this.post(`http://127.0.0.1:8000/api/task_lists/`, {
      name: name
    });
  }
  updateList(list:ITaskList):Promise<ITaskList>{
    return this.put(`http://127.0.0.1:8000/api/task_lists/${list.id}/`, {
      name: list.name
    });
  }
  deleteList(id:Number):Promise<any>{
    return this.delet(`http://127.0.0.1:8000/api/task_lists/${id}/`,{})
  }
  createTask(name:any,id:Number):Promise<ITask>{
    return this.post(`http://127.0.0.1:8000/api/task_lists/${id}/tasks/`, {
      name:name
    });
  }
  logIn(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/logout/', {
    });
  }


}
