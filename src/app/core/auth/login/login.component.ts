import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginModel } from '@models/loginModel';
import { routerPaths } from '@shared/constants';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  routerPath = routerPaths;
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string;
  resended = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private chRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.onChanges();
  }

  onChanges(): void {
    this.loginForm.valueChanges.subscribe(val => {
      this.loginForm.controls.email.setErrors(null);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const reqData: LoginModel = { email: this.loginForm.value.email, password: this.loginForm.value.password };
    this.authService.login(reqData).subscribe(
      (user) => {
        this.chRef.markForCheck();
      },
      (error) => {
        if (error.name === 'USER_NOT_EXIST') {
          this.errorMessage = error.message;
          this.loginForm.controls.email.setErrors({'userNotExist': true});
        }
        if (error.name === 'USER_NOT_VERIFIED') {
          this.errorMessage = error.message;
          this.loginForm.controls.email.setErrors({'userNotVerified': true});
        }
        this.chRef.markForCheck();
      }
    );

  }

  resendEmail() {
    const email: string = this.userService.getUserEmail;
    this.authService.resendConfirmation(email).pipe(
      tap((res) => {
        this.errorMessage = 'Please check email';
        this.resended = true;
      }),
      catchError(error => this.errorMessage = error),
    ).subscribe(() => {
      this.chRef.markForCheck();
    });
  }

}
