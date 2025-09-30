import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class Backend {

  apiURL = 'http://localhost:3000'

  constructor() { }

  async getAll(): Promise<Task[]> {
    let response = await fetch(this.apiURL + '/tasks');   //holt Daten aus Backend --> in Body des response Objekts  
    let allTasks = await response.json();           // .json liest Daten aus Body aus (Array)
    console.log('tasks in service (getAll) : ', allTasks)
    return allTasks;
  }

  async getOne(_id: string): Promise<Task> {
    let response = await fetch(this.apiURL + '/tasks/' + _id); //holt Daten zu übergebener id aus Backend --> in Body des response Objekts 
    let task = await response.json();               // .json liest Daten aus Body aus (einzelner Task)
    console.log('task in service (getOne) : ', task)
    return task;
  }
  
}
