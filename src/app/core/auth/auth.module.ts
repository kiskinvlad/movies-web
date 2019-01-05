import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from '../../app-routing.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AsideService } from '../services/aside/aside.service';
import { MobxAngularModule } from 'mobx-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
