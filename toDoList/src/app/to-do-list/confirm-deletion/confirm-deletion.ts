import { Component, Inject, inject } from '@angular/core';
import { Task } from '../../shared/task';
import { Backend } from '../../shared/backend';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-deletion',
  imports: [MatButtonModule, MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogContent],
  templateUrl: './confirm-deletion.html',
  styleUrl: './confirm-deletion.css'
})
export class ConfirmDeletion {
  message: string = "Möchten Sie wirklich löschen?";
  confirmButtonText = "Ja";
  cancelButtonText = "Abbrechen";

  constructor(
    //private data = inject(MAT_DIALOG_DATA),

    @Inject(MAT_DIALOG_DATA) data: any,   //war private?
    private dialogRef: MatDialogRef<ConfirmDeletion>
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.confirmButtonText = data.confirmButtonText || this.confirmButtonText;
      this.cancelButtonText = data.cancelButtonText || this.cancelButtonText;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true); // Dialog mit "Bestätigt" schließen
  }
  onCancelClick(): void {
    this.dialogRef.close(false); // Dialog mit "Abgebrochen" schließen
  }



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
