import { Component, Inject, inject } from '@angular/core';
import { Task } from '../../shared/task';
import { Backend } from '../../shared/backend';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-deletion',
  imports: [],
  templateUrl: './confirm-deletion.html',
  styleUrl: './confirm-deletion.css'
})
export class ConfirmDeletion {
 //brauche ich hier oninit?

  data = inject(MAT_DIALOG_DATA)

  private backendService = inject(Backend)
  task!: Task;
  private router = inject(Router)

 delete(arg0: string) {
throw new Error('Method not implemented.');
}

cancel(): void {
    this.router.navigate(['']);
    console.log('cancel ausgeführt');
  }
}
