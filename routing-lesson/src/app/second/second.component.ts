import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  constructor(private router: Router) { }
  // Service Router wird per dependency injection eingebunden

  ngOnInit(): void {
  }

  // Behandlung des Klick-Ereignisses
  changeRoute() {
    this.router.navigate(['/first', 'one']);
    // oder
    // this.router.navigateByUrl('/first/one');
  }
}

