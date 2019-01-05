import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '@core/workspace/main/main.component';
import { HomeComponent } from '@core/workspace/home/home.component';
import { UserResolver } from '@shared/resolvers/user.resolver';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          user: UserResolver,
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class WorkspaceRoutingModule { }
