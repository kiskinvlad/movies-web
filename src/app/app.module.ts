import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MobxAngularModule } from 'mobx-angular';

import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faQuestion, faBars } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { HeaderComponent } from '@core/header/header.component';
import { AsideComponent } from '@core/aside/aside.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from '@shared/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MobxAngularModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faAngleDown, faQuestion, faBars);
  }
}
