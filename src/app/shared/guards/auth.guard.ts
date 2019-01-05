import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { routerPaths } from '../constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
    private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.userService.user ? this.userService.user.token : null;
        if (this.userService.user && token) {
            return true;
        }
        this.router.navigate([routerPaths.login]);
        return false;
    }
}
