import { Injectable, EventEmitter } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsideService {

  @observable toggled = false;

  constructor() { }

  @action toggleAside(): void {
    this.toggled = !this.toggled;
  }

  @computed get toggleState(): Observable<boolean> {
    return of(this.toggled);
  }

}
