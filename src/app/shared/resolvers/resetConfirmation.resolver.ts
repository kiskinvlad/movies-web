import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { UserService } from '@shared/services/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class ResetConfirmationResolver implements Resolve<any> {

  constructor (
    private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const token: string = route.queryParams.token;
    const email: string = route.queryParams.email || route.queryParams['amp;email'];

    if (token && email) {
      return of({token, email});
    }
    return EMPTY;
  }

}
