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
  deleted = false;

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

  delete(id: string): void {
    this.bs.deleteOne(id).subscribe(
      {
        next: (response: any) => {
          console.log('response : ', response);
          if(response.status == 204){
            console.log(response.status);
            this.reload(true);
          } else {
            console.log(response.status);
            console.log(response.error);
            this.reload(false);
          }
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteOne() completed')
      });
  }

  reload(deleted: boolean)
  {
    this.deleted = deleted;
    this.readAll();
    this.router.navigateByUrl('/mytasklist');
  }
  klickEvent() {
    this.router.navigate(['/todo']);
  }

}

// Z.20: in readAll wird getAll() vom Backendservice aufgerufen (wird aber nur durch subscribe() aufgerufen!)
// Z. 23-29: subscribe()-Funktion "holt" das Observer-Objekt, welches drei sogenannte callback-Funktionen definiert: next, error und complete
// nur next erforderlich, da erhalten wir die response (das angefragte Objekt) (verwenden Arrow-Funktion, die hier response heißt)
