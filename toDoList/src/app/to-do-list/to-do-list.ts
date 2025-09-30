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
  allTasks : Task[] = []     // leeres Task-Array

  ngOnInit(): void {   
   
    this.backendService.getAll()                        //Promise Task[] wird zurückgegeben
    .then(response => this.allTasks = response)         //this.filteredTasks = Array mit allen Tasks
    .then(allTasks => console.log('tasks in table :', allTasks))

    this.allTasks.filter((t) => t.status === "offen")   //nur offene Tasks anzeigen
  }

  

}
