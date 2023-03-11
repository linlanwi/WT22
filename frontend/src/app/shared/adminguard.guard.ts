import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.auth.isAdmin()
      ? true
      : this.router.parseUrl('/blocked');
  }

}

// --------------- Zusatz vom Skript ---------------
// Idee von Guards: (AdminGuard) festlegen, dass nur Admin Zugriff auf Userlist hat (user muss eingelogged und adinm sein)
