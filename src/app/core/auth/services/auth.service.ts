import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';
import { LoginModel } from '@shared/models/loginModel';
import { configs, apiPaths } from '@shared/constants';
import { RegistrationModel } from '@shared/models/registrationModel';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
    private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(loginModel: LoginModel): Observable<User> {
        return this.http.post<User>(`${configs.apiUrl}${apiPaths.login}`, { loginModel})
            .pipe(map(user => {
                if (user && user.token) {
                    this.userService.setUser(user);
                    this.userService.setToken(user.token);
                    // localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    signUp(registrationModel: RegistrationModel): Observable<any> {
        return this.http.post<any>(`${configs.apiUrl}${apiPaths.registration}`, { registrationModel});
    }

    logout() {
        this.userService.logOut();
        this.currentUserSubject.next(null);
    }
}
