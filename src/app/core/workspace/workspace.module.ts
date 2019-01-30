import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobxAngularModule } from 'mobx-angular';

import { WorkspaceRoutingModule } from '@core/workspace/workspace-routing';
import { MainComponent } from '@core/workspace/main/main.component';
import { HomeComponent } from '@core/workspace/home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    MobxAngularModule,
    TranslateModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
  ],
  providers: [],
})
export class WorkspaceModule { }
