import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { AsideService } from '../../services/aside/aside.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor() { }

  @action ngOnInit() {

  }

}
