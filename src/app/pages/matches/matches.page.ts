import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from 'src/app/core/models/matches.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { MatchService } from 'src/app/core/services/impl/match.service';
import { TeamService } from 'src/app/core/services/impl/team.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { MatchCreateComponent } from 'src/app/shared/components/match-create/match-create.component';

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
  

  selectedMatch: any = null
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

    async openMatch(match: any, index: number){
        await this.presentModalMatch('edit', match)
        this.selectedMatch
      }
    
      private async presentModalMatch(mode:'new'|'edit', match:Match|undefined=undefined){
        const modal = await this.modalCtrl.create({
          component:MatchCreateComponent,
          componentProps:(mode=='edit'?{
            match: match
          }:{})
        });
        modal.onDidDismiss().then(async (response)=>{
          let newMatch : any = null
            newMatch = {
              day: response.data.day,
              hour: response.data.hour,
              result: response.data.result,
              place: response.data.place,
              localTeamId: response.data.localTeamId,
              visitorTeamId: response.data.visitorTeamId
            }
            
          switch (response.role) {
            case 'new':
              this.matchSvc.add(newMatch).subscribe({
                next:res=>{
                  this.getMatches();
                },
                error:err=>{}
              });
              break;
            case 'edit':
              this.matchSvc.update(match!.id, newMatch).subscribe({
                next:res=>{
                  this.getMatches();
                },
                error:err=>{}
              });
              break;
            default:
              break;
          }
        });
        await modal.present();
      }
    
      async onAddMatch(){
        await this.presentModalMatch('new');
      }

}
