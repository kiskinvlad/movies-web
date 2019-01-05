import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAuthedGuard } from '@shared/guards/userAuthed.guard';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UserResolver } from '@shared/resolvers/user.resolver';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './core/auth/auth.module#AuthModule',
    canActivate: [UserAuthedGuard],
  },
  {
    path: '',
    loadChildren: './core/workspace/workspace.module#WorkspaceModule',
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    redirectTo: 'workspace',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
