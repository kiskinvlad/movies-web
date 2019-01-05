import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobxAngularModule } from 'mobx-angular';
import { WorkspaceRoutingModule } from './workspace-routing';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';

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
