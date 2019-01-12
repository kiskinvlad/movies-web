import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmationComponent } from '@core/auth/confirmation/confirmation.component';
import { ConfirmationResolver } from '@shared/resolvers/confirmation.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        resolve: {
          response: ConfirmationResolver,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AuthRoutingModule { }
