import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private as: AuthService,
    private router: Router
  ) {}
  // AuthService & Router Modul per dependency injection eingefügt, um beides verwenden zu können

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.as.isAuthenticated()
      ? true
      : this.router.parseUrl('/login');
      // Rückgabetyp auf boolean & URLTree reduziert
  }
  // liefert diese Funktion ein true zurück, dann gibt auch die canActivate()-Funktion ein true zurück
  // jedoch false, dann liefert die canActivate()-Funktion ein UrlTree in der Form zurück, dass die Navigation auf die Route /login umgeleitet wird


}



// -------------------- Allgemeines ------------------
// Guards sind Funktionen, die entscheiden, ob ein Navigationsschritt ausgfeührt werden darf oder nicht
// Entscheidung wird durch den Rückgabewert der Funktion ausgedrückt
// mögliche Rückgabewerte: true (Navigationsschritt wird ausgeführt), false und URLTree
// letzteres ist Navigation wird abgebrochen und eine Navigation zu einer anderen Route gestartet


// in app-routing-module.ts -> CanAvtivate: entscheidet, ob eine Route aktiviert werden darf
// regulieren, dass nur eine bestimmte Rolle von Nutzern eine bestimmte Komponente verwenden darf
