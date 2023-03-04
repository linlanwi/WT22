import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { Data } from '../shared/data';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  staedte: Data[];

  constructor(private ds: DataService) {
    this.staedte = this.ds.getAll();
  }

  ngOnInit(): void {
  }

}

// [Vorher: verwenden direkt das Array und beschreiben die JavaScript-Objekte nicht in JSON, sondern direkt als Objekte
// (der Unterschied besteht darin, dass die Schlüssel nicht in Anführungsstrichen stehen)]
// JETZT: bisher hatten wir die Daten direkt gespeichert. Nun sollen sie dort über den Service eingebunden werden
// Service wird per Dependency Injection eingebunden (ds Referenz auf den Serice)



