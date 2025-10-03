import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../shared/task';
import { Backend } from '../shared/backend';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-new-to-do',
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-to-do.html',
  styleUrl: './create-new-to-do.css'
})
export class CreateNewToDo {

  private backendservice = inject(Backend)
  private router = inject(Router)
  task: Task = { _id: '', status: '', name: '', date: '' }    //task Objekt erzeugen (nur task Variable geht nicht)
  saved: boolean = false;    // noch einbauen?


  form = new FormGroup({
    //Formular über Steuerelemente ansprechen
    taskNameControl: new FormControl<string>('', [Validators.required]),   //prüft, ob Feld leer ist
    taskDateControl: new FormControl<string>('', [Validators.required])
  });

  create(): void {
    // nur wenn alle Input Felder valid sind task anlegen     

    if (this.form.valid) {
      const values = this.form.value;

      //Formularwerte ansprechen
      //Task Eigenschaften belegen
      this.task.status = "offen";
      this.task.name = values.taskNameControl!;     //ich versichere über require dass Felder nicht leer sein dürfen
      this.task.date = this.formatDateString_DDMMYYYY(values.taskDateControl!);

      this.backendservice.create(this.task)
        .then(() => this.saved = true)
      this.router.navigate(['']);

    }
    
    else { //ansonsten dafür sorge, dass invalidation gesetzt wird
      this.form.markAllAsTouched();  // alle Felder als "berührt" markieren, um Validierung auszulösen
    }


    /*
        if(this.task.name!='' && this.task.date!='') {    // wenn this name und date nicht leer sind, dann neuen task in DB speichern
          this.backendservice.create(this.task)
          .then( () => this.saved = true )
          console.log('Task gespeichert', this.task)
        }*/


  }

  cancel(): void {
    this.router.navigate(['']);
    console.log('cancel ausgeführt');
  }

  //Methode um Datums String umzusortieren   //Hilfe von Chat KI
  formatDateString_DDMMYYYY(datum: string): string {
    const [year, month, day] = datum.split('-');
    return day + '.' + month + '.' + year;
  }

}

