import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private languageService: LanguageService,
    public authSvc: BaseAuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userSvc: UsersService
  ) {
    this.currentLang = this.languageService.getStoredLanguage();
  }
  async ngOnInit(){
    this.router.events.subscribe(() => {
      // Chequear la ruta actual y ocultar el menú si es la página Splash
      const currentRoute = this.router.url;
      this.showMenu = currentRoute !== '/splash'; // O el nombre de tu ruta splash
    });

    try{
      const authUser = await this.authSvc.getCurrentUser()

      if(authUser){
        this._user.next(await lastValueFrom(this.userSvc.getById(authUser.id)))
      }
    }catch(error){
      console.error(error)
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
