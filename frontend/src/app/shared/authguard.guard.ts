import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private as: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.as.isLoggedin()
      ? true
      : this.router.parseUrl('/login');
  }
  // Guard: nur Zugriff auf bestimmte Komponenten, wenn man eingeogged ist
  // Z.18: Fkt. gibt bei Aufruf ein true, wenn die Nutzerin eingeloggt ist
  // isLoggedin()-Fkt. ist aus dem AuthService
  // Z.19: wenn nieman logged in ist, gibt es ein false und die Weiterleitung zu /login
}
