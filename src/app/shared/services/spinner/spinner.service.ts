import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { faShower } from '@fortawesome/free-solid-svg-icons';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  @observable showed: boolean;

  constructor() { }

  @action show(): void {
    this.showed = true;
  }

  @action hide(): void {
    this.showed = false;
  }

  @computed get loading(): boolean {
    return this.showed;
  }

}
