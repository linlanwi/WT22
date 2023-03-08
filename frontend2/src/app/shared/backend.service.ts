import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/members';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Member[]>{
    return this.http.get<Member[]>(this.baseUrl);
  }
}
// Zeile 15 Aufruf der get()-Fkt. von HttpClient
// Parameter der get()-Fkt. ist die URL des backends
// Rückgabewert einer get()-Fkt. ist ein Observable (ist sogar typisiert mit Datenmodelltyp Member)


// --------- Allgemeines ------------
// Service wurde per dependency injection eingebunden

// Observable: implementieren das Observer Pattern
// (Design Pattern zur Kommunikation wischen einem sogenannte subject, das einen oder mehrere observers beobachtet und das immer dann informiert wird, sobald sich der Zustand eines observers geändert hat)
