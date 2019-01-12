import { Injectable, EventEmitter } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { Observable, of } from 'rxjs';

import { JwtUserModel } from '@shared/models/jwtUserModel';
import { User } from '@shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @observable token: string;
  @observable user: JwtUserModel;

  @action setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  @action setUserObject(user: JwtUserModel): void {
    this.user = user;
  }

  @action setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  @action logOut(): void {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.reload();
  }

  @action setUserEmail(email): void {
    localStorage.setItem('email', email);
  }

  @computed get getUserEmail(): string {
    return localStorage.getItem('email');
  }

  @computed get userObject(): Observable<JwtUserModel> {
    return of(this.user);
  }

  @computed get authToken(): string {
    return localStorage.getItem('token');
  }

  @computed get authUser(): Observable<JwtUserModel> {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setUserObject(user);
    return of(user);
  }


}
