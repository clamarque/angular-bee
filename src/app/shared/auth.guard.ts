import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private af: AngularFireAuth) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
    }

<<<<<<< HEAD
  checkLogin(): Observable<boolean> | Promise<boolean> | boolean {
=======
  checkLogin(): Observable<boolean> {
>>>>>>> af317dc5ff9cffbd2f5bf29d7109c5822ec4a276
    return this.af.authState.map(auth => {
      if (auth === null) {
        this.router.navigate(['/signin'])
        return false
      }
      else {
        return true;
      }
    })
  }
}
