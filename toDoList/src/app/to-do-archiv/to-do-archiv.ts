import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Backend } from '../shared/backend';
import { Task } from '../shared/task';

@Component({
  selector: 'app-to-do-archiv',
  imports: [RouterLink],
  templateUrl: './to-do-archiv.html',
  styleUrl: './to-do-archiv.css'
})
export class ToDoArchiv implements OnInit {
     //OnInit --> Ausführung bei Initialisierung der Seite

  private backendService = inject(Backend) //backend service einbinden, damit Mathoden genutzt werden können
  allTasks: Task[] = [];     // leeres Task-Array
  filteredTasks: Task[] = [];
  task!: Task;
  deleteStatus: boolean = false;

  async ngOnInit(): Promise<void> {

    this.allTasks = await this.backendService.getAll(); //Promise Task[] wird zurückgegeben //Array mit allen Tasks     

    //jetzt nach erledigten sortieren
    this.filteredTasks = this.allTasks.filter((t) => t.status == "erledigt")   //nur erledigte Tasks anzeigen
      .sort((a, b) => {
        let dateA = new Date(a.date.split('.').reverse().join('-'));
        let dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      }); //sort mit KI erstellt

  }

  delete(_id: string): void {    //deleteOne im backendService aufrufen (gibt message zurück)
    this.backendService.deleteOne(String(_id))
      .then(() => {
        this.ngOnInit();
        this.deleteStatus = true;
      });
    }

markAsUndone(_id: string): void {
    //Task holen
    //mit update auf erledigt ändern

    this.backendService
      .getOne(String(_id))      //task holen
      .then((response) => {     //bekomme Promise Task zurück
        this.task = response;
        this.task.status = "offen";
        return this.task;
      })
      .then(() => {
        this.backendService.update(_id, this.task)
        .then(() => {   // updateMethode des Service aufrufen (diese spricht wiederum update im backend an)
            this.ngOnInit();    //refresh der Seite
          })
      })  
  }



}
