import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@shared/services/user/user.service';
import { routerPaths } from '@shared/constants';

@Injectable({ providedIn: 'root' })
export class UserAuthedGuard implements CanActivate {

    constructor(private router: Router,
    private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const token = this.userService.authToken;
      if (token) {
        this.router.navigate([routerPaths.home]);
        return false;
      }
      return true;
    }
}
