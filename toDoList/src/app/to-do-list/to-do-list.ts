import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Backend } from '../shared/backend';
import { Task } from '../shared/task';

@Component({
  selector: 'app-to-do-list',
  imports: [RouterLink],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit{    //OnInit --> Ausführung bei Initialisierung der Seite

  private backendService = inject(Backend) //backend service einbinden, damit Mathoden genutzt werden können
  allTasks : Task[] = [];     // leeres Task-Array
  filteredTasks : Task[] = []; 

  async ngOnInit(): Promise<void> {

    this.allTasks = await this.backendService.getAll(); //Promise Task[] wird zurückgegeben //Array mit allen Tasks     
    
    //jetzt nach offenen sortieren
    this.filteredTasks = this.allTasks.filter((t) => t.status == "offen")   //nur offene Tasks anzeigen
    .sort((a,b) => {
        let dateA = new Date(a.date.split('.').reverse().join('-'));
        let dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      }); //sort mit KI erstellt
  }
  
  delete(_id : String) : void {
console.log(`Delete task with id=${_id}`);
}

}
