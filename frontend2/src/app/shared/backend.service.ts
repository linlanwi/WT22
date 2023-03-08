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

  getOne(id: string): Observable<Member>{
    return this.http.get<Member>(this.baseUrl + '/' + id);
  }
  // id und Daten zu einem Member werden übergeben

  update(id: string, data: Member): Observable<Member> {
    return this.http.patch<Member>(this.baseUrl + '/' + id, data);
  }
  // id und Daten aus dem Formular werden übergeben

  deleteOne(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/' + id, {observe: 'response'});
  }
  // im Gegensatz zu den anderen Endpunkten, kann die Response leer sein (wenn Datensatz gelöscht) oder es wird ein Objekt mit einem Error zurückgesendet
  // daher Typisierung des Observeable mit any
  // wir wollen auf HTTP-Status von response zurückgeben, daher darf die response nicht leer sein
  // wir fügen einen 2. Parameter ein {observe: 'response'}, der besagt, dass in jedem Fall eine response durch das Observable erzeugt wird
}


// Zeile 15 Aufruf der get()-Fkt. von HttpClient
// Parameter der get()-Fkt. ist die URL des backends
// Rückgabewert einer get()-Fkt. ist ein Observable (ist sogar typisiert mit Datenmodelltyp Member)


// --------- Allgemeines ------------
// Service wurde per dependency injection eingebunden

// Observable: implementieren das Observer Pattern
// (Design Pattern zur Kommunikation wischen einem sogenannte subject, das einen oder mehrere observers beobachtet und das immer dann informiert wird, sobald sich der Zustand eines observers geändert hat)
