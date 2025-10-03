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
export class ToDoList implements OnInit {    //OnInit --> Ausführung bei Initialisierung der Seite

  private backendService = inject(Backend) //backend service einbinden, damit Mathoden genutzt werden können
  allTasks: Task[] = [];     // leeres Task-Array
  filteredTasks: Task[] = [];
  deleteStatus: boolean = false;
  task!: Task;

  async ngOnInit(): Promise<void> {
    // async Methode, die Promise zurückgibt
    this.allTasks = await this.backendService.getAll(); //Promise Task[] wird zurückgegeben //Array mit allen Tasks     

    //jetzt nach offenen sortieren
    this.filteredTasks = this.allTasks.filter((t) => t.status == "offen")   //nur offene Tasks anzeigen
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

    /**
      delete(_id: string): void {    
        this.backendService.getOne(String(_id)) //getOne im backendService aufrufen (gibt Promise Task zurück)
        .then((response) => { 
          this.task = response;  
          this.deleteStatus = true;
          console.log('delete status :' , this.deleteStatus)
        });    
      }  
    
      confirm() {
        this.backendService.deleteOne(String(this.task._id))
        .then( () => {
          this.backendService.getAll()
          .then( response => {
            this.allTasks = response 
            this.deleteStatus=false;
          })
        })
      }
      
    
      cancel(): void{
        this.deleteStatus=false;
      }*/
  }

  markAsDone(_id: string): void {
    //Task holen
    //mit update auf erledigt ändern

    this.backendService
      .getOne(String(_id))      //task holen
      .then((response) => {     //bekomme Promise Task zurück
        this.task = response;
        this.task.status = "erledigt";
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
