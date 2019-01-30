import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { routerPaths } from '@shared/constants';
import { RegistrationModel } from '@shared/models/registrationModel';
import { AuthenticationService } from '@core/auth/services/auth.service';
import { observable, action } from 'mobx-angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  routerPath = routerPaths;
  registrationForm: FormGroup;

  @observable submitted = false;
  @observable errorMessage: string;
  @observable sended = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private chRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  @action onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
    const reqData: RegistrationModel = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      isVerified: false
    };
    this.authService.signUp(reqData).subscribe(
      (user) => {
        this.sended = true;
        this.chRef.markForCheck();
      },
      (error) => {
        if (error.name === 'USER_EMAIL_EXIST') {
          this.errorMessage = error.name;
          this.registrationForm.controls.email.setErrors({'emailExist': true});
          this.chRef.markForCheck();
        }
      }
    );
  }

}
