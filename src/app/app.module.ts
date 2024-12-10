import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { LeaguesRepositoryFactory, TeamsRepositoryFactory, PlayersRepositoryFactory, AuthMappingFactory, AuthenticationServiceFactory, PeopleRepositoryFactory, MediaServiceFactory } from './core/repositories/repository.factory';
import { LEAGUE_API_URL_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN, LEAGUE_REPOSITORY_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, 
  TEAM_API_URL_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN, TEAM_REPOSITORY_TOKEN, TEAM_RESOURCE_NAME_TOKEN, 
  PLAYER_API_URL_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN, PLAYER_REPOSITORY_TOKEN,PLAYER_RESOURCE_NAME_TOKEN,
  AUTH_ME_API_URL_TOKEN, 
  AUTH_SIGN_IN_API_URL_TOKEN,
  AUTH_SIGN_UP_API_URL_TOKEN,
  UPLOAD_API_URL_TOKEN,PEOPLE_REPOSITORY_TOKEN,
  BACKEND_TOKEN,
  PEOPLE_REPOSITORY_MAPPING_TOKEN,
  PEOPLE_API_URL_TOKEN,
  PEOPLE_RESOURCE_NAME_TOKEN} from './core/repositories/repository.tokens';
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),

    {provide: PEOPLE_REPOSITORY_TOKEN, useClass: UsersService},
    {provide: BACKEND_TOKEN, useValue: 'strapi'},
    {provide: PEOPLE_RESOURCE_NAME_TOKEN, useValue: 'users'},
    {provide: LEAGUE_RESOURCE_NAME_TOKEN, useValue: 'leagues'},
    {provide: TEAM_RESOURCE_NAME_TOKEN, useValue: 'teams'},
    {provide: PLAYER_RESOURCE_NAME_TOKEN, useValue: 'players'},
    {provide: LEAGUE_API_URL_TOKEN, useValue: 'http://localhost:1337/api'},
    {provide: TEAM_API_URL_TOKEN, useValue: 'http://localhost:1337/api'},
    {provide: PLAYER_API_URL_TOKEN, useValue: 'http://localhost:1337/api'},
    {provide: PEOPLE_API_URL_TOKEN, useValue: 'http://localhost:1337/api'},
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local' },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local/register' },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: 'http://localhost:1337/api/users/me' },
    { provide: UPLOAD_API_URL_TOKEN, useValue: 'http://localhost:1337/api/upload' },

    {
      provide: PEOPLE_REPOSITORY_MAPPING_TOKEN,
      useClass: UsersMappingStrapi
    },
    {
      provide: LEAGUE_REPOSITORY_MAPPING_TOKEN,
      useClass: LeagueMappingStrapi
    },
    {
      provide: TEAM_REPOSITORY_MAPPING_TOKEN,
      useClass: TeamMappingStrapi
    },
    {
      provide: PLAYER_REPOSITORY_MAPPING_TOKEN,
      useClass: PlayerMappingStrapi
    },
    LeaguesRepositoryFactory,
    TeamsRepositoryFactory,
    PlayersRepositoryFactory,
    PeopleRepositoryFactory,
    AuthMappingFactory,
    LeaguesRepositoryFactory,
    TeamsRepositoryFactory,
    PlayersRepositoryFactory,
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
      provide: 'PeopleService',
      useClass: UsersService
    },

    AuthenticationServiceFactory,
    MediaServiceFactory,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
