import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// @Component (Decorator (@)) um eine Komponente der gesamten Anwendung bekannt zu machen
// Selektor gibt an, dass überall wo der <app-root></app-root> (Elementselektor) verwendet wird
// das in app.component.html definerte Template eingesetzt wird

export class AppComponent {
  title = 'frontend';
}

// Ts-Klasse kümmert sich um die Verwaltung der Daten, die in der View dargestellt werden
// und/oder durch Eingaben erzeugt werden => beschreibt also Logik der Komponente
