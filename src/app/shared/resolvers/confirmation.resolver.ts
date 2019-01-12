import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { UserService } from '@shared/services/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class ConfirmationResolver implements Resolve<any> {

  constructor (
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const token: string = route.queryParams.token;
    const email: string = this.userService.getUserEmail;

    if (token) {
      return this.authService.confirmation(email, token).pipe(
        tap((res) => {
          return res;
        }),
        catchError(error => this.handleError(error)),
      );
    }
    return EMPTY;
  }

  private handleError(error: any) {
    return of(error);
  }

}
