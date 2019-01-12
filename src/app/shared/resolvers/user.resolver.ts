import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { JwtUserModel } from '@shared/models/jwtUserModel';
import { UserService } from '@shared/services/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<JwtUserModel> {

  constructor (
    private userService: UserService,
    private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<JwtUserModel> {
    return this.userService.authUser
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
