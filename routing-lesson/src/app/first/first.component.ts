import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  id: string = ''; // in TS müssen Klassenmember initialisiert werden

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
   // this.id = this.route.snapshot.paramMap.get('id')!; // Nicht-null-Assertion Operator ! -> teilen TypeScript mit, dass der Wert nicht null ist

   /*// bessere Variante: Laufzeitprüfung, ob der Wert null ist
   const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
    }*/

    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id !== null) {
        this.id = id;
      }
    });
    // Nullüberprüfung, get() von paramMap ist ein String oder null, wenn es null ist, kann man es id (vom Typ String) nicht zuweisen
    // nun erhält id immer den aktuellsten wert (durch Interpolation wird auch stets der aktuelle Wert in der View dargestellt)
  }
}

// Eigenschaft id als String deklariert
// es wird der Service ActivatedRoute per dependency injection der Klasse FirstComponent injiziert (Eigenschaft Route ist vom Typ ActivatedRoute)
// ActivatedRoute stellt uns Informationen über den aktuellen Router (die aktuelle URL) zur Verfügung
// this.route.snapshot.paramMap.get() enthält alle Parameter der aktuellen Route

