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
}


// --------- Allgemeines ------------
// Service mit Modul HttpClientModule für Kommunikation mit dem Backend per HTTP
// Http Client per dependency injection eingebunden
// Zeile 15 Aufruf der get()-Fkt., Parameter ist URL des Backends
// Zeile 10 baseUrl definiert, also Backend URL
// Rückgabewert der get()-Fkt. ist ein Observable
// Exkurs: Observable implementieren das Observer Pattern - ein Design Pattern zur Kommunikation zwischen einem sogenannte subject, das einen oder mehrere observers beobachtet und das immer dann informiert wird, sobald sich der Zustand eines observers geändert hat
// Observable ist typisiert mit Datenmodell Todo
// bekommen ein Array von Todo-Objekten zurück, deshalb Observable<ToDo[]> als Rückgabetyp
// da der Rückgabetyp von getAll() so konkret ist, muss auch der Rückgabetyp von get() typisiert werden


