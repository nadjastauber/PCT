import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateNewToDo } from "./create-new-to-do/create-new-to-do";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateNewToDo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('toDoList');
}
