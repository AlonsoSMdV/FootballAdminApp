import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentLang:string
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService) {
      this.currentLang = this.languageService.getStoredLanguage();
    }

}
