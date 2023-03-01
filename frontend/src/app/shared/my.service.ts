import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //gibt an, dass der Service von allen Modulen genutzt werden kann
})

export class MyService {
  members: any;

  constructor() {}

  getMembers() {
    fetch('./assets/members.json')
    .then( res => res.json() )
    .then( jsonData => {
      this.members = jsonData;
      console.log('getQuestions', this.members);

    })
    return this.members;

  }
}
// Bsp-Service MyService: stellt eine Funktion getMembers() für alle Komponenten zur Verfügung
// stellt über diese Fkt. das members-Array bereit


// --------- Allgemeines aus dem Skript -----------
// Service ist eine Klasse für einen konkreten Zweck
// z.B. Daten vom Server holen oder auf den Server laden, Nutzereingaben validieren
// steht allen Komponenten zur Verfügung
// ist Klasse mit Decorator @Injectable()
