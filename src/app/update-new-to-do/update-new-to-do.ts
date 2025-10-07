import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Backend } from '../shared/backend';
import { Task } from '../shared/task';


@Component({
  selector: 'app-update-new-to-do',
  imports: [ReactiveFormsModule],
  templateUrl: './update-new-to-do.html',
  styleUrl: './update-new-to-do.css'
})
export class UpdateNewToDo implements OnInit {

  private backendService = inject(Backend)
  private route = inject(ActivatedRoute)   // liefert Infos der aktuellen Route (URL)
  private router = inject(Router)     // Service ermöglicht navigate-Funktion

  _id: string | null = '' //Variable kann String oder null sein, Initialisierung
  task !: Task   //garantiert, dass Variable nicht null ist


  form = new FormGroup({
    //Steuerelemente
    taskNameControl: new FormControl<string>(''),
    taskDateControl: new FormControl<string>('')
  });


  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id');      //id aus URL auslesen
    console.log('id = ', this._id)
    this.backendService
      .getOne(this._id!)       //Tasks mit id aus Datenbank holen (nicht null)
      .then(response => {      //Daten des task in Formular hinterlegen
        this.task = response
        this.form.patchValue({               //weist einzelnen FormControlElementen einen Wert zu
          taskNameControl: this.task.name,

          // um den Datepicker mit altem Datum zu belegen, muss Datum aus DB ins richtige Format gebracht werden
          // String 10.07.2025 muss zu 2025-07-10
          taskDateControl: this.task.date.split('.').reverse().join('-'),    //Nutzung KI
        });
        return this.task
      })
  }


  // bei OnInit wird Task geholt und in this.task gespeichert, bei speichern wird für diesen Task die update Methode genutzt
  update(): void {
    const values = this.form.value;   //um values aus Formular zu holen    

    this.task.name = values.taskNameControl!; //name zuordnen

    if (values.taskDateControl) {  //wenn Datum neu eingegeben, formatieren! 
      let newDate = this.formatDateString_DDMMYYYY(values.taskDateControl!);
      this.task.date = newDate;
    }

    else {
      this.task.date = values.taskDateControl!;     //altes datum erneut nutzen;
    }

    this.backendService.update(this._id!, this.task)      // updateMethode des Service aufrufen (diese spricht wiederum update im backend an)
      .then(() => this.router.navigate(['']))
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  //Methode um Datums String umzusortieren   //Hilfe von Chat KI
  formatDateString_DDMMYYYY(datum: string): string {
    const [year, month, day] = datum.split('-');
    return day + '.' + month + '.' + year;
  }

}
