import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

  }

  setTranslation(lang) {
    this.translate.use(lang);
  }

  getLang(): any {
    return this.translate.getBrowserLang();
  }
}
