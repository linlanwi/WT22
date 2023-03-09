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
  /* beim Erstellen der Komponente ngOnInit()) wird die Variable todos mit allen Daten aus der Datenbank befüllt */

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

// hier wird die getAll() Fkt. vom BackendService genutzt

// ----------------- Code Erklärung ----------------------
// wir binden den BackendService mittels dependency injection in unsere Komponente ein
// in readAll wird getAll() vom Backendservice aufgerufen, wird nur durch subscribe() aufgerufen

// subscribe()-Funktion "holt" das Observer-Objekt, welches drei sogenannte callback-Funktionen definiert: next, error und complete
// nur next erforderlich, da erhalten wir die response (das angefragte Objekt) (verwenden Arrow-Funktion, die hier response heißt)