import { Injectable } from '@angular/core';
import { City } from './city';

//das ist mein Service --> stellt Daten für Komponenten bereit


@Injectable({
  providedIn: 'root'
})
export class Data {  

  constructor() { }

  async getAll(): Promise<City[]> {
    let response = await fetch('./assets/staedte.json');
    let staedte = await response.json();
    console.log('staedte', staedte)
    return staedte;
  }

  async getOne(id: number): Promise<City[]> {
    let response = await fetch('./assets/staedte.json');
    let staedte: City[] = await response.json();
    let stadt: City[] = staedte.filter( data => data.id == id );
    console.log('stadt', stadt)
    return stadt;
  }
  
}
