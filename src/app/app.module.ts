import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationServiceFactory, AuthMappingFactory, LeaguesMappingFactory, LeaguesRepositoryFactory, MediaServiceFactory, PlayersMappingFactory, PlayersRepositoryFactory, TeamsMappingFactory, TeamsRepositoryFactory } from './core/repositories/repository.factory';
import { LeagueService } from './core/services/impl/league.service';
import { TeamService } from './core/services/impl/team.service';
import { PlayerService } from './core/services/impl/player.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BACKEND_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, TEAM_RESOURCE_NAME_TOKEN, PLAYER_RESOURCE_NAME_TOKEN, LEAGUE_API_URL_TOKEN, TEAM_API_URL_TOKEN, PLAYER_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, AUTH_ME_API_URL_TOKEN, UPLOAD_API_URL_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN } from './core/repositories/repository.tokens';
import { SharedModule } from './shared/shared.module';
import { LeagueMappingStrapi } from './core/repositories/impl/league-mapping-strapi.service';
import { PlayerMappingStrapi } from './core/repositories/impl/player-mapping-strapi.service';
import { TeamMappingStrapi } from './core/repositories/impl/team-mapping-strapi.service';

// Factory function para el loader de traducción
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: BACKEND_TOKEN, useValue: 'strapi' },
    { provide: LEAGUE_RESOURCE_NAME_TOKEN, useValue: 'leagues' },
    { provide: TEAM_RESOURCE_NAME_TOKEN, useValue: 'teams' },
    { provide: PLAYER_RESOURCE_NAME_TOKEN, useValue: 'players' },
    { provide: LEAGUE_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: TEAM_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: PLAYER_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local' },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local/register' },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: 'http://localhost:1337/api/users/me' },
    { provide: UPLOAD_API_URL_TOKEN, useValue: 'http://localhost:1337/api/upload' },
    
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
    LeaguesMappingFactory,
    TeamsMappingFactory,
    PlayersMappingFactory,
    AuthMappingFactory,
    LeaguesRepositoryFactory,
    TeamsRepositoryFactory,
    PlayersRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    {
      provide: 'LeagueService',
      useClass: LeagueService
    },
    {
      provide: 'TeamService',
      useClass: TeamService
    },
    {
      provide: 'PlayerService',
      useClass: PlayerService
    },
    AuthenticationServiceFactory,
    MediaServiceFactory

    // ... otros proveedores],

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}