import { Injectable, EventEmitter } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @observable token: string;
  @observable user: User;
  @observable email: string;

  @action initToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
  }

  @action setUser(user: User): void {
    this.user = user;
  }

  @action setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  @action logOut(): void {
    this.user = null;
    this.token = null;
    this.email = null;
    localStorage.removeItem('token');
  }

  @action setUserEmail(email: string): void {
    this.email = email;
    localStorage.setItem('email', email);
  }

  @computed get userObject(): Observable<User> {
    return of(this.user);
  }


}
