import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from 'src/app/shared/data';
import { DataService } from 'src/app/shared/data.service';
// ActivatedRoute benötigen wir zum Auslesen der aktiven Route, zum Auslesen der id

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  id: number = 0;
  stadt!: Data;
  // ! ist eine assertion (Zusicherung, Non nul assertion operator)
  // TS-Compiler muss sich nicht darum kümmern, ob der Wert nulll ist

  constructor(
    private route: ActivatedRoute,
    private ds: DataService,
    private router: Router
    ) { }
  // DataService & ActivatedRoute per Dependency Injection eingebunden
  // DataService benötigen wir, um das entsprechende stadt-Objekt zu erhalten und ActivatedRoute wird benötigt, um die Zahl (id) zu ermitteln, die bei der aktuellen Route angegeben ist

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Arrow Funktion (Kurzschreibweise für anonyme Fkt.)
    // legt fest, ob die aktivierte Route wiederverwendet werden soll
    // Komponente wird neugeladen, wenn aktivierte Route sich ändert

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // Route wird ausgelesen
    // Wert wird ursprünglich als String zurückgegeben & wird mit Number zu number konvertiert
    // snapshot liest die Route genau einmal aus (beim Initialisieren der Komponente) (hört nicht ständig auf Änderungen der Route)

    this.stadt = this.ds.getOne(this.id);
    // id wird der getOne() aus DataService übergeben
    // Fkt. liefert die entsprechende stadt aus dem staedte Array
  }

}

