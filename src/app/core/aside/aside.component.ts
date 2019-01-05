import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { observable } from 'mobx-angular';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
