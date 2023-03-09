import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-mytasklist',
  templateUrl: './mytasklist.component.html',
  styleUrls: ['./mytasklist.component.css']
})
export class MytasklistComponent implements OnInit {
  todos!: Todo[];
  deleted = false; // Variable ist dafür da, um anzeigen zu lassen, dass der Datensatz gelöscht wurde

  constructor(private bs: BackendService, private router: Router) { }   // wir binden den BackendService mittels dependency injection in unsere Komponente ein

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
  // Z.23: in readAll wird getAll() vom Backendservice aufgerufen (wird aber nur durch subscribe() aufgerufen!)
  // Z. 23-29: subscribe()-Funktion "holt" das Observer-Objekt, welches drei sogenannte callback-Funktionen definiert: next, error und complete
  // nur next erforderlich, da erhalten wir die response (das angefragte Objekt) (verwenden Arrow-Funktion, die hier response heißt)

  delete(id: string): void {
    this.bs.deleteOne(id).subscribe(
      {
        next: (response: any) => {
          console.log('response : ', response);
          if(response.status == 204){
            console.log(response.status);
            this.reload(true); // // bei true wird die Löschnachricht angezeigt
          } else {
            console.log(response.status);
            console.log(response.error);
            this.reload(false); // bei false wird die Tabelle angezeigt
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteOne() completed')
      });
  }
  // Z.35: delete(id) ruft deleteOne(id) mit subscribe auf
  // darin ist eine Fallunterscheidung der zurückgegeben HTTP-Status
  // Z.38: Typisierung ist any, da die response leer sein kann (wenn der Datensatz leer ist) -> ist sie hier aber nicht, Grund ist in der Backend Service
  // Z.40: in der Response ist auch der HTTP-Status

  reload(deleted: boolean)
  {
    this.deleted = deleted;
    this.readAll();
    this.router.navigateByUrl('/mytasklist');
  }
  // reload()-Fkt. Tabelle wird neugeladen

  klickEvent() {
    this.router.navigate(['/todo']);
  }


}
