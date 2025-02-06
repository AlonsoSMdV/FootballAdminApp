import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from 'src/app/core/models/matches.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { MatchService } from 'src/app/core/services/impl/match.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  currentLang:string
  _matches: BehaviorSubject<Match[]> = new BehaviorSubject<Match[]>([])
  matches$: Observable<Match[]> = this._matches.asObservable()

  constructor(
    private matchSvc: MatchService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getStoredLanguage();
   }

  ngOnInit() {
    this.getMatches()
  }

  selectedLeague: any = null
    page: number = 1;
    pageSize:number = 25;
    pages:number = 0;
  
    getMatches(){
      this.page=1;
      this.matchSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Match>)=>{
          this._matches.next([...response.data]);
          this.page++;
          this.pages = response.pages;
        }
      });
    }
    
    getMoreMatches(notify: HTMLIonInfiniteScrollElement | null = null){
      this.matchSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response: Paginated<Match>)=>{
          this._matches.next([...this._matches.value, ...response.data]);
          this.page++;
          notify?.complete();
        }
      })
    }

}
