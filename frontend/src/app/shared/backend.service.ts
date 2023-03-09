import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl);
  }

  getOne(id: string): Observable<Todo>{
    return this.http.get<Todo>(this.baseUrl + '/' + id);
  } // ruft Endpunkt GET /todos/id der REST-API des Backends auf

  update(id: string, data: Todo): Observable<Todo> {
    return this.http.patch<Todo>(this.baseUrl + '/' + id, data);
  }
  // id und Daten aus Formular werden update()-Fkt. übergeben
  deleteOne(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/' + id, {observe: 'response'});
  }
  //
}


// --------- Allgemeines ------------
// Service mit Modul HttpClientModule für Kommunikation mit dem Backend per HTTP

// Http Client per dependency injection eingebunden

// Zeile 15 Aufruf der get()-Fkt., Parameter ist URL des Backends (GET-Request an das Backend, um alle todos abzufragen)
// Zeile 10 baseUrl definiert, also Backend URL
// Rückgabewert der get()-Fkt. ist ein Observable

// Exkurs: Observable implementieren das Observer Pattern - ein Design Pattern zur Kommunikation zwischen einem sogenannte subject, das einen oder mehrere observers beobachtet und das immer dann informiert wird, sobald sich der Zustand eines observers geändert hat

// Observable ist typisiert mit Datenmodell Todo
// bekommen ein Array von Todo-Objekten zurück, deshalb Observable<ToDo[]> als Rückgabetyp
// da der Rückgabetyp von getAll() so konkret ist, muss auch der Rückgabetyp von get() typisiert werden


