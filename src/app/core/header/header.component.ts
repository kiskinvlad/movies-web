import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { tap, isEmpty } from 'rxjs/operators';

import { User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';
import { AsideService } from '@core/aside/services/aside.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user: User;
  public userExist: boolean;

  constructor(public asideService: AsideService, private userService: UserService) {

  }

  @action ngOnInit() {
    this.userService.userObject.pipe(
      tap((user) => {
        this.user = user;
      })
    ).subscribe();
  }

  @action toggleAside(): void {
    this.asideService.toggleAside();
  }

}
