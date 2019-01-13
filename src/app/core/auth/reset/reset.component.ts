import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { observable } from 'mobx-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  @observable sended = false;
  @observable submitted = false;
  @observable errorMessage: string;
  @observable resended = false;

  public resetForm: FormGroup;
  private email: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private chRef: ChangeDetectorRef,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.email = this.resetForm.controls.email.value;
    this.authService.resetPassword(this.email).subscribe(
      () => {
        this.sended = true;
        this.chRef.markForCheck();
      },
      (error) => {
        if (error.name === 'USER_NOT_EXIST') {
          this.errorMessage = error.message;
          this.resetForm.controls.email.setErrors({'userNotExist': true});
        }
        if (error.name === 'USER_NOT_VERIFIED') {
          this.errorMessage = error.message;
          this.resetForm.controls.email.setErrors({'userNotVerified': true});
        }
        // if (error.name === 'USER_TOKEN_NOT_FOUND') {
        //   this.errorMessage = error.message;
        //   this.resetForm.controls.email.setErrors({'tokenNotFound': true});
        // }
        // if (error.name === 'USER_NOT_VERIFIED') {
        //   this.errorMessage = error.message;
        //   this.resetForm.controls.email.setErrors({'userNotVerified': true});
        // }
        // if (error.name === 'PASSWORD_NOT_EXIST') {
        //   this.errorMessage = error.message;
        //   this.resetForm.controls.email.setErrors({'passNotExist': true});
        // }
        // if (error.name === 'TOKEN_NOT_VERIFIED') {
        //   this.errorMessage = error.message;
        //   this.resetForm.controls.email.setErrors({'tokenNotVerified': true});
        // }
        this.chRef.markForCheck();
      }
    );
  }

  public sendVerification() {
    const email: string = this.email;
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
