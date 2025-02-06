import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { LeaguesRepositoryFactory, TeamsRepositoryFactory, PlayersRepositoryFactory, AuthMappingFactory, AuthenticationServiceFactory, UserRepositoryFactory, MediaServiceFactory, PlayersMappingFactory, TeamsMappingFactory, LeaguesMappingFactory, UserMappingFactory, MatchMappingFactoty, MatchRepositoryFactory } from './core/repositories/repository.factory';
import { LEAGUE_API_URL_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN, LEAGUE_REPOSITORY_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, 
  TEAM_API_URL_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN, TEAM_REPOSITORY_TOKEN, TEAM_RESOURCE_NAME_TOKEN, 
  PLAYER_API_URL_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN, PLAYER_REPOSITORY_TOKEN,PLAYER_RESOURCE_NAME_TOKEN,
  AUTH_ME_API_URL_TOKEN, 
  AUTH_SIGN_IN_API_URL_TOKEN,
  AUTH_SIGN_UP_API_URL_TOKEN,
  UPLOAD_API_URL_TOKEN,USER_REPOSITORY_TOKEN,
  BACKEND_TOKEN,
  USER_REPOSITORY_MAPPING_TOKEN,
  USER_API_URL_TOKEN,
  USER_RESOURCE_NAME_TOKEN, FIREBASE_CONFIG_TOKEN,
  MATCH_RESOURCE_NAME_TOKEN,
  MATCH_API_URL_TOKEN} from './core/repositories/repository.tokens';
import { LeagueService } from './core/services/impl/league.service';
import { PlayerService } from './core/services/impl/player.service';
import { TeamService } from './core/services/impl/team.service';
import { LeagueMappingStrapi } from './core/repositories/impl/league-mapping-strapi.service';
import { TeamMappingStrapi } from './core/repositories/impl/team-mapping-strapi.service';
import { PlayerMappingStrapi } from './core/repositories/impl/player-mapping-strapi.service';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { UsersService } from './core/services/impl/users.service';
import { UsersMappingStrapi } from './core/repositories/impl/users-mapping-strapi.service';
import { BaseMediaService } from './core/services/impl/base-media.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import player from 'lottie-web';
import { provideLottieOptions } from 'ngx-lottie';
import { environment } from 'src/environments/environment';
import { LeagueMappingFirebase } from './core/repositories/impl/league-mapping-firebase.service';
import { TeamMappingFirebase } from './core/repositories/impl/team-mapping-firebase.service';
import { PlayerMappingFirebase } from './core/repositories/impl/player-mapping-firebase.service';
import { MatchService } from './core/services/impl/match.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },provideLottieOptions({
      player: () => player,
    }),
    provideHttpClient(),

    {provide: USER_REPOSITORY_TOKEN, useClass: UsersService},
    {provide: BACKEND_TOKEN, useValue: 'firebase'},
    {provide: USER_RESOURCE_NAME_TOKEN, useValue: 'usuarios'},
    {provide: LEAGUE_RESOURCE_NAME_TOKEN, useValue: 'leagues'},
    {provide: TEAM_RESOURCE_NAME_TOKEN, useValue: 'teams'},
    {provide: PLAYER_RESOURCE_NAME_TOKEN, useValue: 'players'},
    {provide: MATCH_RESOURCE_NAME_TOKEN, useValue: 'matches'},
    {provide: LEAGUE_API_URL_TOKEN, useValue: `${environment.apiUrl}/api`},
    {provide: TEAM_API_URL_TOKEN, useValue: `${environment.apiUrl}/api`},
    {provide: PLAYER_API_URL_TOKEN, useValue: `${environment.apiUrl}/api`},
    {provide: MATCH_API_URL_TOKEN, useValue: `${environment.apiUrl}/api`},
    {provide: USER_API_URL_TOKEN, useValue: `${environment.apiUrl}/api`},
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/auth/local` },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue:  `${environment.apiUrl}/api/auth/local/register` },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/users/me` },
    { provide: UPLOAD_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/upload` },
    { provide: FIREBASE_CONFIG_TOKEN, useValue:
      {
        apiKey: "AIzaSyAypMZSz9Vgg0DUsGw1jLbzgUS3uNs86tg",
        authDomain: "footballcomps-f5afd.firebaseapp.com",
        projectId: "footballcomps-f5afd",
        storageBucket: "footballcomps-f5afd.firebasestorage.app",
        messagingSenderId: "1036668813891",
        appId: "1:1036668813891:web:1af654984665fdaae78af6",
        measurementId: "G-FR5S50J8LC"
      }
    },

    UserMappingFactory,
    LeaguesMappingFactory,
    TeamsMappingFactory,
    PlayersMappingFactory,
    MatchMappingFactoty,
    LeaguesRepositoryFactory,
    TeamsRepositoryFactory,
    PlayersRepositoryFactory,
    MatchRepositoryFactory,
    UserRepositoryFactory,
    AuthMappingFactory,
    
    {
      provide: 'LeagueService',
      useClass:LeagueService
    },{
      provide: 'TeamService',
      useClass:TeamService
    },{
      provide: 'PlayerService',
      useClass:PlayerService
    },
    {
      provide: 'UsersService',
      useClass: UsersService
    },
    {
      provide: 'MatchService',
      useClass: MatchService
    },

    AuthenticationServiceFactory,
    MediaServiceFactory,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
