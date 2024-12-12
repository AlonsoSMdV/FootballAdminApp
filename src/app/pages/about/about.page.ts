import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  currentLang:string
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService) {
      this.currentLang = this.languageService.getStoredLanguage();
    }
  ngOnInit() {
  }

}
