import { Routes } from '@angular/router';
import { CreateNewToDo } from './create-new-to-do/create-new-to-do';
import { ToDoList } from './to-do-list/to-do-list';
import { Cities } from './cities/cities';
import { UpdateNewToDo } from './update-new-to-do/update-new-to-do';
import { ToDoArchiv } from './to-do-archiv/to-do-archiv';

export const routes: Routes = [
{ path: "create", component: CreateNewToDo },
{ path: "tasks/:id", component: UpdateNewToDo },
{ path: "update", component: UpdateNewToDo },
{ path: "archiv", component: ToDoArchiv },
{ path: "cities", component: Cities },
{ path: "cities/:id", component: Cities }, //Übung Daten auslesen
{ path: "", component: ToDoList, pathMatch: 'full' }, //full --> Route wird nur aufgrerufen, wenn in URL nichts weiter folgt
{ path: "**", redirectTo: "" } //bei fehlerhafter URL wird auf ""Route verwiesen
];
