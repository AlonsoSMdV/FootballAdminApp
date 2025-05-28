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

    cards = [
  {
    title: 'LEAGUES.TITLE',
    description: 'HOME.LEAGUES',
    link: '/leagues',
    cta: 'HOME.SEE_LEAGUES'
  },
  {
    title: 'TEAMS.TITLE',
    description: 'HOME.TEAMS',
    link: '/teams',
    cta: 'HOME.SEE_TEAMS'
  },
  {
    title: 'PLAYERS.TITLE',
    description: 'HOME.PLAYERS',
    link: '/players',
    cta: 'HOME.SEE_PLAYERS'
  },
  {
    title: 'MATCHES.TITLE',
    description: 'HOME.MATCHES',
    link: '/matches',
    cta: 'HOME.SEE_MATCHES'
  }
];


}
