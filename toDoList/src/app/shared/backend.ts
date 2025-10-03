import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class Backend {

  apiURL = 'http://localhost:3000'

  constructor() { }

  //alle Datensätze holen
  async getAll(): Promise<Task[]> {
    let response = await fetch(this.apiURL + '/tasks');   //holt Daten aus Backend --> in Body des response Objekts  
    let allTasks = await response.json();           // .json liest Daten aus Body aus (Array)
    console.log('tasks in service (getAll) : ', allTasks)
    return allTasks;
  }

  //ein Datensatz holen
  async getOne(_id: string): Promise<Task> {
    let response = await fetch(this.apiURL + '/tasks/' + _id); //holt Daten zu übergebener id aus Backend --> in Body des response Objekts 
    let task = await response.json();               // .json liest Daten aus Body aus (einzelner Task)
    console.log('task in service (getOne) : ', task)
    return task;
  }

  //ein Datensatz ändern (jetzt also patch Endpunkt in Backend ansprechen), fetch muss um Parameter erweitert werden
  //übergebe id und Task
  async update(id: string, updateData: Task): Promise<Task> {
    let response = await fetch(this.apiURL + '/tasks/' + id, {    // Endpunkt mit Patch Methode ansprechen, in response speichern
      method: "PATCH",                                            
      body: JSON.stringify(updateData),                           //JavaScript-O. zu JSON umwandeln //Konfiguration Body des request
      headers: {
        "Content-Type": "application/json",                       // wenn JSON, dann content type setzten
      },
    });     
    let task = await response.json();                              // response Body auslesen (ist der task)
    console.log('task in service (update) : ', task)
    return task;
  }
  
}
