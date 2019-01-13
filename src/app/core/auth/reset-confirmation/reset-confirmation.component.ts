import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { observable } from 'mobx-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { Data, ActivatedRoute } from '@angular/router';
import { routerPaths } from '@shared/constants';

@Component({
  selector: 'app-reset-confirmation',
  templateUrl: './reset-confirmation.component.html',
  styleUrls: ['./reset-confirmation.component.scss']
})
export class ResetConfirmationComponent implements OnInit {

  @observable sended = false;
  @observable submitted = false;
  @observable errorMessage: string;

  public resetForm: FormGroup;
  private response: Data;
  public routerPath = routerPaths;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private chRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.response = this.activatedRoute.snapshot.data.response;
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }

    const password = this.resetForm.controls.password.value;
    const email = this.response.email;
    const token = this.response.token;
    this.authService.setNewPassword(email, password, token).subscribe(
      () => {
        this.sended = true;
        this.chRef.markForCheck();
      },
      (error) => {
        if (error.name === 'USER_NOT_EXIST') {
          this.errorMessage = error.message;
          this.resetForm.controls.password.setErrors({'userNotExist': true});
        }
        if (error.name === 'USER_TOKEN_NOT_FOUND') {
          this.errorMessage = error.message;
          this.resetForm.controls.password.setErrors({'tokenNotFound': true});
        }
        if (error.name === 'PASSWORD_NOT_EXIST') {
          this.errorMessage = error.message;
          this.resetForm.controls.password.setErrors({'passNotExist': true});
        }
        if (error.name === 'TOKEN_NOT_VERIFIED') {
          this.errorMessage = error.message;
          this.resetForm.controls.password.setErrors({'tokenNotVerified': true});
        }
        this.chRef.markForCheck();
      }
    );
  }

}
