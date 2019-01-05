import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MobxAngularModule } from 'mobx-angular';

import { AuthRoutingModule } from '@core/auth/auth-routing.module';
import { LoginComponent } from '@core/auth/login/login.component';
import { RegistrationComponent } from '@core/auth/registration/registration.component';
import { AuthComponent } from '@core/auth/auth/auth.component';
import { AsideService } from '@core/aside/services/aside.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MobxAngularModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent,
  ],
  providers: [AsideService],
})
export class AuthModule { }
