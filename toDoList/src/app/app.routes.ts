import { Routes } from '@angular/router';
import { CreateNewToDo } from './create-new-to-do/create-new-to-do';
import { ToDoList } from './to-do-list/to-do-list';

export const routes: Routes = [
{ path: "create", component: CreateNewToDo },
{ path: "", component: ToDoList, pathMatch: 'full' }, //full --> Route wird nur aufgrerufen, wenn in URL nichts weiter folgt
{ path: "**", redirectTo: "" } //bei fehlerhafter URL wird auf ""Route verwiesen
];
