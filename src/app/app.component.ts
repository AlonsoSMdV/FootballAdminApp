import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, filter } from 'rxjs';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { LanguageService } from './core/services/language.service';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { UsersService } from './core/services/impl/users.service';

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

  constructor(
    private languageService: LanguageService,
    public authSvc: BaseAuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userSvc: UsersService
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
