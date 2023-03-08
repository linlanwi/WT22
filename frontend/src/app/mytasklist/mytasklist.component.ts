import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-mytasklist',
  templateUrl: './mytasklist.component.html',
  styleUrls: ['./mytasklist.component.css']
})
export class MytasklistComponent implements OnInit {
  todos!: Todo[];

  constructor(private bs: BackendService) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
          {
            next: (response) => {
                  this.todos = response;
                  console.log(this.todos);
                  return this.todos;
                },
            error: (err) => console.log(err),
            complete: () => console.log('getAll() completed')
          })
  }

  delete(id: string): void {
    console.log("id :" ,id );
  }
}

// ----------- Allgemeines aus dem Skript -----------------
// hier wird die getAll() Fkt. vom BackendService genutzt
// wir binden den BackendService mittels dependency injection in unsere Komponente ein
// getAll() wird nur durch subscribe() aufgerufen
// subscribe()-Funktion "holt" das Observer-Objekt, welches drei sogenannte callback-Funktionen definiert: next, error und complete
// nur next erforderlich, da erhalten wir die response (verwenden Arrow-Funktion, die hier response heißt)

// ----------------- Code Erklärung ----------------------
// beim Erstellen der Komponente ngOnInit()) wird die Variable todos mit allen Daten aus der Datenbank befüllt
// Dieses Array wird in der mytasklist.component.html ausgelesen
// Wir verwenden dazu wieder die *ngFor-Direktive
