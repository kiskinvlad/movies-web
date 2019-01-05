import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor (
    private userService: UserService,
    private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.userService.userObject
      .pipe(
        catchError(error => this.handleError(error)),
      );
  }

  private handleError(error: any) {
    this.router.navigate(['auth'],
      {replaceUrl: true, queryParamsHandling: 'merge'});
    return EMPTY;
  }

}
