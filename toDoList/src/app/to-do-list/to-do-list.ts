import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Backend } from '../shared/backend';
import { Task } from '../shared/task';
import { MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDeletion } from './confirm-deletion/confirm-deletion';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-to-do-list',
  imports: [RouterLink, MatDialogModule, ReactiveFormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {
  //OnInit --> Ausführung bei Initialisierung der Seite

  private backendService = inject(Backend) //backend service einbinden, damit Mathoden genutzt werden können
  allTasks: Task[] = [];     // leeres Task-Array
  filteredTasks: Task[] = [];
  deleteStatus: boolean = false; //?
  task!: Task;
  searchInput = new FormControl(''); // Suchzeile wird über FormControl angesprochen, initial leer

  private dialog = inject(Dialog);   //Modal

  protected openModal() {
    this.dialog.open(ConfirmDeletion);
  }

  // onInit
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

  // confirm deletion
  confirm(_id: string): void {
    const confirmed = window.confirm('Möchtest du das ToDo wirklich löschen?');
    if (confirmed) {
      this.delete(_id);
    }
  }

  //delete
  delete(_id: string): void {    //deleteOne im backendService aufrufen (gibt message zurück)
    this.backendService.deleteOne(String(_id))
      .then(() => {
        this.ngOnInit();
        this.deleteStatus = true; //???? Toast!
      });
  }

  search() {
    let input = this.searchInput.value?.toLocaleLowerCase() || ''; // ? prüft, ob es value gibt. wenn ja toLowerCase, wenn nein '' 

    this.filteredTasks = this.allTasks.filter(
      (t) => (t.name.toLowerCase().includes(input) || (t.date.includes(input) && t.status == 'offen'))
  );    
  }

  markAsDone(_id: string): void {
    //Task holen
    //mit update auf erledigt ändern

    this.backendService
      .getOne(String(_id))      //task holen
      .then((response) => {     //bekomme Promise Task zurück
        this.task = response;
        this.task.status = 'erledigt';
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
