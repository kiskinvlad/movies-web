import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Data, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { routerPaths } from '@shared/constants';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  public response: Data;
  public routerPath = routerPaths;
  public sended = false;

  constructor(private activatedRoute: ActivatedRoute,
  private authService: AuthenticationService,
  private userService: UserService,
  private route: ActivatedRoute,
  private chRef: ChangeDetectorRef,
) { }

  ngOnInit() {
    this.response = this.activatedRoute.snapshot.data.response;
  }

  resendEmail() {
    const email: string = this.response.email;
    this.authService.resendConfirmation(email).pipe(
      tap((res) => {
        this.response = res;
      }),
      catchError(error => this.response = error),
    ).subscribe(() => {
      this.sended = true;
      this.chRef.markForCheck();
    });
  }

}
