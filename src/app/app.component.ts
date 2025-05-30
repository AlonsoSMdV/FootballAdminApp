import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, filter } from 'rxjs';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { LanguageService } from './core/services/language.service';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { UsersService } from './core/services/impl/users.service';
import { LeagueService } from './core/services/impl/league.service';
import { Team } from './core/models/teams.model';
import { TeamService } from './core/services/impl/team.service';
import { PlayerService } from './core/services/impl/player.service';
import { Users } from './core/models/users.model';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  private _user: BehaviorSubject<any> = new BehaviorSubject<any>({})
  user$: Observable<any> = this._user.asObservable()
  showMenu: boolean = true;
  currentLang: string;
  userWithAuth$: Observable<{ isAuthenticated: boolean; user: any; }> | undefined;

  @ViewChild('menu', { static: false }) menu: IonMenu | undefined;

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.menu?.isOpen &&
      !target.closest('ion-menu') &&
      !target.closest('ion-menu-button')
    ) {
      this.menu.close();
    }
  }

  constructor(
    private languageService: LanguageService,
    public authSvc: BaseAuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userSvc: UsersService,
    public leagueSvc: LeagueService,
    public teamSvc: TeamService,
    public playerSvc: PlayerService
  ) {
    this.currentLang = this.languageService.getStoredLanguage();
  }
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showMenu = this.router.url !== '/splash';
    });
  
    //Logica al iniciar sesion para que la barra note al usuario autenticado y coja el rol de este
    this.authSvc.loginSuccessObs$.subscribe(async () => {
      try {
        const authUser = await this.authSvc.getCurrentUser();
        if (authUser) {
          const userFromDb = await lastValueFrom(this.userSvc.getByUserId(authUser.id));
          this._user.next(userFromDb);
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    // También se mantiene la lógica inicial para cuando ya está logueado
    this.authSvc.getCurrentUser().then(async (authUser) => {
      if (authUser) {
        const userFromDb = await lastValueFrom(this.userSvc.getByUserId(authUser.id));
        this._user.next(userFromDb);
      }
    });
  
    this.userWithAuth$ = combineLatest([
      this.authSvc.authenticated$,
      this.user$
    ]).pipe(
      filter(([isAuthenticated, user]) => isAuthenticated && !!user),
      map(([isAuthenticated, user]) => ({ isAuthenticated, user }))
    );
    // Suscribirse para cargar nombres favoritos
    this.userWithAuth$.subscribe(({ user }) => {
      this.loadFavoriteNames(user);
    });
  }

  favoriteNames = {
    league: '',
    leagueImg: '',
    team: '',
    teamImg: '',
    player: '',
    playerImg: ''
  };
  
  loadFavoriteNames(user: Users) {
    if (user.leagueFav) {
      this.leagueSvc.getById(user.leagueFav).subscribe(league => {
        this.favoriteNames.league = league?.name || '';
        this.favoriteNames.leagueImg = league?.picture?.url || ''; // o el campo real de imagen
      });
    }
  
    if (user.teamFav) {
      this.teamSvc.getById(user.teamFav).subscribe(team => {
        this.favoriteNames.team = team?.name || '';
        this.favoriteNames.teamImg = team?.picture?.url || '';
      });
    }
  
    if (user.playerFav) {
      this.playerSvc.getById(user.playerFav).subscribe(player => {
        this.favoriteNames.player = `${player?.name} ${player?.firstSurname}` || '';
        this.favoriteNames.playerImg = player?.picture?.url || '';
      });
    }
  }

  /*isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const body = document.body;
    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }*/

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
    this.currentLang = lang;
    this.languageService.storeLanguage(lang);
  }

  logout() {
    this.authSvc.signOut().subscribe(()=>{
      this.router.navigate(['/login']);
    });
  }
}
