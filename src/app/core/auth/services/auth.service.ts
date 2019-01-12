import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, empty, throwError } from 'rxjs';
import { map, tap, catchError, share, mergeMap, flatMap, finalize } from 'rxjs/operators';

import { LoginModel } from '@shared/models/loginModel';
import { configs, apiPaths } from '@shared/constants';
import { RegistrationModel } from '@shared/models/registrationModel';
import { JwtUserModel } from '@shared/models/jwtUserModel';
import { HeaderService } from '@core/header/services/header.service';
import { SpinnerService } from '@shared/services/spinner/spinner.service';
import { UserService } from '@shared/services/user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private _token: BehaviorSubject<String>;
    private _user: BehaviorSubject<JwtUserModel>;
    public currentToken: Observable<String>;
    public currentUser: Observable<JwtUserModel>;

    constructor(private http: HttpClient,
        private spinner: SpinnerService,
        private headerService: HeaderService,
        private userService: UserService) {
        this._token = new BehaviorSubject<String>(localStorage.getItem('token'));
        this.currentToken = this._token.asObservable();
        this._user = new BehaviorSubject<JwtUserModel>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this._user.asObservable();
    }

    public get currentTokenValue(): String {
        return this._token.value;
    }

    login(loginModel: LoginModel): Observable<JwtUserModel> {
        this.spinner.show();
        return this.http.post<JwtUserModel>(`${configs.apiUrl}${apiPaths.login}`, { loginModel })
            .pipe(
                map(user => {
                const userObject = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    image: user.image
                };
                const token = user.token;
                if (user && token) {
                    this.userService.setUser(userObject);
                    this.userService.setToken(token);
                    this._user.next(user);
                    this._token.next(token);
                    location.reload(true);
                }
                return user;
            }), catchError((err) => {
                return throwError(err);
            }),
            finalize(() => {
                this.spinner.hide();
            }),
            share()
        );
    }

    signUp(registrationModel: RegistrationModel): Observable<any> {
        this.spinner.show();
        this.userService.setUserEmail(registrationModel.email);
        return this.http.post<any>(`${configs.apiUrl}${apiPaths.registration}`, { registrationModel})
            .pipe(
                tap((user) => {
                    return user;
                }), catchError((err) => {
                    return throwError(err);
                }),
                finalize(() => {
                    this.spinner.hide();
                }),
                share()
            );
    }

    confirmation(email: String, token: String): Observable<any> {
        this.spinner.show();
        return this.http.post<any>(`${configs.apiUrl}${apiPaths.confirmation}`, { email, token })
        .pipe(
            tap((response) => {
                return response;
            }), catchError((err) => {
                return throwError(err);
            }),
            finalize(() => {
                this.spinner.hide();
            }),
            share()
        );
    }

    resendConfirmation(email: String): Observable<any> {
        this.spinner.show();
        return this.http.post<any>(`${configs.apiUrl}${apiPaths.resend}`, { email })
        .pipe(
            tap((response) => {
                return response;
            }), catchError((err) => {
                return throwError(err);
            }),
            finalize(() => {
                this.spinner.hide();
            }),
            share()
        );
    }

    updateUser(email: String, image: String): Observable<any> {
        this.spinner.show();
        return this.http.patch<any>(`${configs.apiUrl}${apiPaths.update}`, { email, image })
        .pipe(
            flatMap((user) => {
                return this.http.post<JwtUserModel>(`${configs.apiUrl}${apiPaths.getUser}`, { email });
            }),
            catchError((err) => {
                return throwError(err);
            }),
            finalize(() => {
                this.headerService.close('User avatar changed');
                this.spinner.hide();
                location.reload();
            }),
            share()
        );
    }

    logout() {
        this.userService.logOut();
        this._user.next(null);
        this._token.next(null);
    }
}
