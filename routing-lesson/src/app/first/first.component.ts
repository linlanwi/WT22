import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}

// Eigenschaft id als String deklariert
// es wird der Service ActivatedRoute per dependency injection der Klasse FirstComponent injiziert (Eigenschaft Route ist vom typ ActivatedRoute)
//

