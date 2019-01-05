import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AsideService } from './core/services/aside/aside.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public toggled: boolean;

  constructor(public asideService: AsideService, private userService: UserService) {
    this.toggled = this.asideService.toggled;
  //   this.userService.setUser(
  //     {
  //       id: 1,
  //       password: '111111',
  //       firstName: 'Vlad',
  //       lastName: 'Kiskin',
  //       token: 'ssss'
  //     }
  // );
  }
  title = 'app';
}
