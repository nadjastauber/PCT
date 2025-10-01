import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Backend } from '../shared/backend';
import { Task } from '../shared/task';


@Component({
  selector: 'app-update-new-to-do',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-new-to-do.html',
  styleUrl: './update-new-to-do.css'
})
export class UpdateNewToDo implements OnInit {

  private backendService = inject(Backend)
  private route = inject(ActivatedRoute)   // liefert Infos der Roue (URL)
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
          taskNameControl: this.task.name,  //this.task?.name 

          // um den Datepicker mit altem Datum zu belegen, muss Datum aus DB ins richtige Format gebracht werden
          // String 10.07.2025 muss zu 2025-07-10
          taskDateControl: this.task.date.split('.').reverse().join('-'),    
        });
        return this.task
      })
      .then(task => console.log('task in DetailComponent : ', task))
  }


  update() {

  }

  cancel() {

  }

}
