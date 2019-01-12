import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AsideService } from '@core/aside/services/aside.service';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { SpinnerService } from '@shared/services/spinner/spinner.service';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public toggled: boolean;
  public loading;
  title = 'app';

  constructor(
    private asideService: AsideService,
    private userService: UserService,
    private spinnerService: SpinnerService) {
      this.toggled = this.asideService.toggled;
      this.loading = this.spinnerService.loading;
  }
}
