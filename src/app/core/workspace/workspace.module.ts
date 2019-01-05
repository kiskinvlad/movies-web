import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobxAngularModule } from 'mobx-angular';

import { WorkspaceRoutingModule } from '@core/workspace/workspace-routing';
import { MainComponent } from '@core/workspace/main/main.component';
import { HomeComponent } from '@core/workspace/home/home.component';



@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    MobxAngularModule,
  ],
  declarations: [
    MainComponent,
    HomeComponent,
  ],
  providers: [],
})
export class WorkspaceModule { }
