import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { routerPaths } from '@shared/constants';
import { UserService } from '@shared/services/user/user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
    private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.userService.authToken;
        if (token) {
            return true;
        }
        this.router.navigate([routerPaths.login]);
        return false;
    }
}
