import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return false;
  }
}

// auth service dient später Nutzer und Rollenverwaltung
// Dummy Funktion: service & auth-Fkt. wird in auth-Guard verwendet
