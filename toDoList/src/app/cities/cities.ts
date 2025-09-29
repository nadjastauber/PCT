import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { City } from '../shared/city';
import { Data } from '../shared/data';

@Component({
  selector: 'app-cities',
  imports: [RouterLink],
  templateUrl: './cities.html',
  styleUrl: './cities.css'
})
export class Cities implements OnInit{
id: string | null = "";
 staedte: City[] = [];

constructor(private route: ActivatedRoute, private data: Data) { //benötigen wir um Parameter für route cities/:id auslesen zu können
    this.data.getAll()
    .then( response => this.staedte = response)
    .then( staedte => console.log('staedte geladen', staedte))
  }

ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) console.log('id : ', this.id);
    else console.log('ohne Parameter');

  }

}
