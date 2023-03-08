import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Member } from '../shared/member';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  members: Member[] = [];
  deleted = false; // um Nachricht anzeigen zu lassen, dass der Datensatz gelöscht wurde, nutzen wir diese Eigenschaft
  // ist der Wert false, wird die Tabelle angezeigt, ist er true, wird die Löschnachricht angezeigt
  // In der Löschnachricht ist ein Button, dessen Klickereignis die Funktion reload() aufruft

  constructor(private bs: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.readAll();
  }
  // ngOnInit() beim Erstellen der Komponente wird die Variable members mit allen Daten aus der Datenbank befüllt
  // dieses array wird in der table.component.html ausgelesen

  readAll(): void {
    this.bs.getAll().subscribe(
          {
            next: (response) => {
                  this.members = response;
                  console.log(this.members);
                  return this.members;
                }, //arrow Fkt. namens response
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
    // reload() wird die Tabelle neu geladen
    // alle Einträge aus der Datenbank mit readAll() geholt, damit man sieht, dass der Datensatz gelöscht wurde
  }

  reload(deleted: boolean)
  {
    this.deleted = deleted;
    this.readAll();
    this.router.navigateByUrl('/table');
}
}

// BackendService mittels dependency injection eingebunden
// eigene Fkt. readAll ruft die getAll()-Fkt. des Backendservice auf
// Fkt. wird nur durch ein subscribe() ausgeführt
// subscribe()-Fkt. "holt" das Observer-Objekt, welches 3 callback-Funktionen definiert: next, error und complete
// next gibt uns die response als das erfragte Objekt
