import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Member } from '../shared/member';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  members!: Member[];

  constructor(private bs: BackendService) { }

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
    console.log("id :" ,id );
  }
}

// BackendService mittels dependency injection eingebunden
// eigene Fkt. readAll ruft die getAll()-Fkt. des Backendservice auf
// Fkt. wird nur durch ein subscribe() ausgeführt
// subscribe()-Fkt. "holt" das Observer-Objekt, welches 3 callback-Funktionen definiert: next, error und complete
// next gibt uns die response als das erfragte Objekt
