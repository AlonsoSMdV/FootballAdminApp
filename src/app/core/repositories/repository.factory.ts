// src/app/repositories/repository.factory.ts
import { FactoryProvider, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Users } from '../models/users.model';
import { AUTH_MAPPING_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN,  LEAGUE_API_URL_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN, LEAGUE_REPOSITORY_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, USER_API_URL_TOKEN, USER_REPOSITORY_MAPPING_TOKEN, USER_REPOSITORY_TOKEN, USER_RESOURCE_NAME_TOKEN, PLAYER_API_URL_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN, PLAYER_REPOSITORY_TOKEN, PLAYER_RESOURCE_NAME_TOKEN, TEAM_API_URL_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN, TEAM_REPOSITORY_TOKEN, TEAM_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN, FIREBASE_CONFIG_TOKEN, FIREBASE_COLLECTION_TOKEN, MATCH_REPOSITORY_MAPPING_TOKEN, MATCH_REPOSITORY_TOKEN, MATCH_API_URL_TOKEN, MATCH_RESOURCE_NAME_TOKEN, LEAGUE_COLLECTION_SUBSCRIPTION_TOKEN, TEAM_COLLECTION_SUBSCRIPTION_TOKEN, PLAYER_COLLECTION_SUBSCRIPTION_TOKEN, MATCH_COLLECTION_SUBSCRIPTION_TOKEN, USERS_COLLECTION_SUBSCRIPTION_TOKEN, MATCH_STATS_REPOSITORY_MAPPING_TOKEN, MATCH_STATS_API_URL_TOKEN, MATCH_STATS_REPOSITORY_TOKEN, MATCH_STATS_RESOURCE_NAME_TOKEN, MATCH_STATS_COLLECTION_SUBSCRIPTION_TOKEN } from './repository.tokens';
import { BaseRespositoryLocalStorageService } from './impl/base-repository-local-storage.service';
import { Model } from '../models/base.model';
import { IBaseMapping } from './intefaces/base-mapping.interface';
import { JsonServerRepositoryService } from './impl/json-server-repository.service';
import { StrapiRepositoryService } from './impl/strapi-repository.service';
import { BaseAuthenticationService } from '../services/impl/base-authentication.service';
import { IAuthMapping } from '../services/interfaces/auth-mapping.interface';
import { StrapiAuthenticationService } from '../services/impl/strapi-authentication.service';
import { UsersLocalStorageMapping } from './impl/users-mapping-local-storage.service';
import { UsersMappingStrapi } from './impl/users-mapping-strapi.service';
import { StrapiAuthMappingService } from '../services/impl/strapi-auth-mapping.service';
import { IStrapiAuthentication } from '../services/interfaces/strapi-authentication.interface';
import { StrapiMediaService } from '../services/impl/strapi-media.service';
import { BaseMediaService } from '../services/impl/base-media.service';
import { LeagueMappingStrapi } from './impl/league-mapping-strapi.service';
import { TeamMappingStrapi } from './impl/team-mapping-strapi.service';
import { PlayerMappingStrapi } from './impl/player-mapping-strapi.service';
import { League } from '../models/leagues.model';
import { Team } from '../models/teams.model';
import { Player } from '../models/players.model';
import { BaseRepositoryFirebaseService } from './impl/base-repository-firebase.service';
import { LeagueMappingFirebase } from './impl/league-mapping-firebase.service';
import { TeamMappingFirebase } from './impl/team-mapping-firebase.service';
import { PlayerMappingFirebase } from './impl/player-mapping-firebase.service';
import { FirebaseAuthenticationService } from '../services/impl/firebase-authentication.service';
import { FirebaseAuthMappingService } from '../services/impl/firebase-auth-mapping.service';
import { LeagueJsonServerStorageMapping } from './impl/league-mapping-json-server.service';
import { TeamJsonServerStorageMapping } from './impl/team-mapping-json-server.service';
import { PlayerJsonServerStorageMapping } from './impl/player-mapping-json-server.service';
import { UsersMappingFirebase } from './impl/users-mapping-firebase.service';
import { IAuthentication } from '../services/interfaces/authentication.interface';
import { FirebaseMediaService } from '../services/impl/firebase-media.service';
import { MatchMappingFirebase } from './impl/match-mapping-firebase.service';
import { Match } from '../models/matches.model';
import { FirebaseCollectionSubscriptionService } from '../services/impl/firebase-collection-subscription.interface';
import { ICollectionSubscription } from '../services/interfaces/collection-subscription.interface';
import { MatchStatisticsMappingFirebase } from './impl/matchStatistics-mapping-firebase.service';
import { MatchStatistics } from '../models/matchStatistics.model';

export function createBaseRepositoryFactory<T extends Model>(
  token: InjectionToken<IBaseRepository<T>>,
  dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, http: HttpClient, auth:IStrapiAuthentication, apiURL: string, resource: string, mapping: IBaseMapping<T>, firebaseConfig?: any) => {
      switch (backend) {
        case 'http':
          return new BaseRepositoryHttpService<T>(http, auth, apiURL, resource, mapping);
        case 'local-storage':
          return new BaseRespositoryLocalStorageService<T>(resource, mapping);
        case 'json-server':
          return new JsonServerRepositoryService<T>(http, auth,apiURL, resource, mapping);
        case 'strapi':
          return new StrapiRepositoryService<T>(http, auth, apiURL, resource, mapping);
        case 'firebase':
          return new BaseRepositoryFirebaseService<T>(firebaseConfig, resource, mapping);
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

export function createBaseMappingFactory<T extends Model>(
  token: InjectionToken<IBaseMapping<T>>,
  dependencies: any[],
  modelType: 'league' | 'team' | 'player' | 'match' | 'matchStatistic' | 'usuario'
): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, firebaseConfig?: any) => {
      switch (backend) {
        case 'local-storage':
          return modelType === 'league' 
          if (modelType === 'league') {
            return new LeagueJsonServerStorageMapping()
          }else if(modelType === 'team') {
            return new TeamJsonServerStorageMapping()
          }else if(modelType === 'player') {
            return new PlayerJsonServerStorageMapping()
          }else{
            return new UsersMappingStrapi()
          }
        case 'json-server':
          return modelType === 'league'
          if (modelType === 'league') {
            return new LeagueJsonServerStorageMapping()
          }else if(modelType === 'team') {
            return new TeamJsonServerStorageMapping()
          }else if(modelType === 'player') {
            return new PlayerJsonServerStorageMapping()
          }
        case 'strapi':
          if (modelType === 'league') {
            return new LeagueMappingStrapi
          }else if(modelType === 'team') {
            return new TeamMappingStrapi
          }else if(modelType === 'player') {
            return new PlayerMappingStrapi
          }else{
            return new UsersMappingStrapi()
          }
        case 'firebase':
          
          if (modelType === 'league') {
            return new LeagueMappingFirebase(firebaseConfig)
          }else if(modelType === 'team') {
            return new TeamMappingFirebase(firebaseConfig)
          }else if(modelType === 'player') {
            return new PlayerMappingFirebase(firebaseConfig)
          }else if(modelType === 'match'){
            return new MatchMappingFirebase(firebaseConfig)
          }else if(modelType === 'matchStatistic'){
            return new MatchStatisticsMappingFirebase(firebaseConfig)
          }else{
            return new UsersMappingFirebase(firebaseConfig);
          }
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};


export function createBaseAuthMappingFactory(token: InjectionToken<IAuthMapping>, dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'http':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'local-storage':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'json-server':
          throw new Error("BACKEND NOT IMPLEMENTED");
        
        case 'strapi':
          return new StrapiAuthMappingService();
        case 'firebase':
          return new FirebaseAuthMappingService();
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};


export const LeaguesMappingFactory = createBaseMappingFactory<League>(
  LEAGUE_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'league'
);

export const TeamsMappingFactory = createBaseMappingFactory<Team>(
  TEAM_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'team'
);

export const PlayersMappingFactory = createBaseMappingFactory<Player>(
  PLAYER_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'player'
);

export const MatchMappingFactory = createBaseMappingFactory<Match>(
  MATCH_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'match'
);

export const MatchStatsMappingFactory = createBaseMappingFactory<MatchStatistics>(
  MATCH_STATS_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'matchStatistic'
);

export const UserMappingFactory = createBaseMappingFactory<Users>(
  USER_REPOSITORY_MAPPING_TOKEN,
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'usuario'
);


export const AuthMappingFactory: FactoryProvider = createBaseAuthMappingFactory(AUTH_MAPPING_TOKEN, [BACKEND_TOKEN]);

export const AuthenticationServiceFactory:FactoryProvider = {
  provide: BaseAuthenticationService,
  useFactory: (backend:string, firebaseConfig:any, signIn:string, signUp:string, meUrl:string, mapping:IAuthMapping, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiAuthenticationService(signIn, signUp, meUrl, mapping, http);
      case 'firebase':
        return new FirebaseAuthenticationService(firebaseConfig, mapping);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_MAPPING_TOKEN, HttpClient]
};

export const MediaServiceFactory:FactoryProvider = {
  provide: BaseMediaService,
  useFactory: (backend:string, firebaseConfig:any, upload:string, auth:IAuthentication, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'firebase':
        return new FirebaseMediaService(firebaseConfig, auth)
      case 'strapi':
        return new StrapiMediaService(upload, auth as IStrapiAuthentication, http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN, UPLOAD_API_URL_TOKEN, BaseAuthenticationService, HttpClient]
};


export const UserRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Users>(USER_REPOSITORY_TOKEN,
  [
    BACKEND_TOKEN, 
    HttpClient, 
    BaseAuthenticationService, 
    USER_API_URL_TOKEN, 
    USER_RESOURCE_NAME_TOKEN, 
    USER_REPOSITORY_MAPPING_TOKEN, 
    FIREBASE_CONFIG_TOKEN
  ]
);
export const LeaguesRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<League>(LEAGUE_REPOSITORY_TOKEN,
  [
    BACKEND_TOKEN, 
    HttpClient, 
    BaseAuthenticationService, 
    LEAGUE_API_URL_TOKEN, 
    LEAGUE_RESOURCE_NAME_TOKEN, 
    LEAGUE_REPOSITORY_MAPPING_TOKEN, 
    FIREBASE_CONFIG_TOKEN
  ]
);

export const TeamsRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Team>(TEAM_REPOSITORY_TOKEN,
  [
    BACKEND_TOKEN, 
    HttpClient, 
    BaseAuthenticationService, 
    TEAM_API_URL_TOKEN, 
    TEAM_RESOURCE_NAME_TOKEN, 
    TEAM_REPOSITORY_MAPPING_TOKEN, 
    FIREBASE_CONFIG_TOKEN
  ]
);

export const PlayersRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Player>(PLAYER_REPOSITORY_TOKEN,
  [
    BACKEND_TOKEN, 
    HttpClient, 
    BaseAuthenticationService, 
    PLAYER_API_URL_TOKEN, 
    PLAYER_RESOURCE_NAME_TOKEN, 
    PLAYER_REPOSITORY_MAPPING_TOKEN, 
    FIREBASE_CONFIG_TOKEN]
);

export const MatchRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Match>(MATCH_REPOSITORY_TOKEN,
  [
    BACKEND_TOKEN, 
    HttpClient, 
    BaseAuthenticationService, 
    MATCH_API_URL_TOKEN, 
    MATCH_RESOURCE_NAME_TOKEN, 
    MATCH_REPOSITORY_MAPPING_TOKEN, 
    FIREBASE_CONFIG_TOKEN]
);

export const MatchStatsRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<MatchStatistics>(MATCH_STATS_REPOSITORY_TOKEN,
  [
    BACKEND_TOKEN, 
    HttpClient, 
    BaseAuthenticationService, 
    MATCH_STATS_API_URL_TOKEN, 
    MATCH_STATS_RESOURCE_NAME_TOKEN, 
    MATCH_STATS_REPOSITORY_MAPPING_TOKEN, 
    FIREBASE_CONFIG_TOKEN]
);

export function createCollectionSubscriptionFactory<T extends Model>(
  collectionName: string,
  mappingToken: InjectionToken<IBaseMapping<T>>,
  collectionSubscriptionToken: InjectionToken<ICollectionSubscription<T>>
): FactoryProvider {
  return {
    provide: collectionSubscriptionToken,
    useFactory: (backend: string, firebaseConfig: any, mapping: IBaseMapping<T>) => {
      switch (backend) {
        case 'firebase':
          return new FirebaseCollectionSubscriptionService<T>(firebaseConfig, mapping);
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN, mappingToken]
  };
}
// Factorías específicas para cada tipo
export const LeagueCollectionSubscriptionFactory = createCollectionSubscriptionFactory<League>(
  'league',
  LEAGUE_REPOSITORY_MAPPING_TOKEN,
  LEAGUE_COLLECTION_SUBSCRIPTION_TOKEN
);
export const TeamCollectionSubscriptionFactory = createCollectionSubscriptionFactory<Team>(
  'team',
  TEAM_REPOSITORY_MAPPING_TOKEN,
  TEAM_COLLECTION_SUBSCRIPTION_TOKEN
);
export const PlayerCollectionSubscriptionFactory = createCollectionSubscriptionFactory<Player>(
  'player',
  PLAYER_REPOSITORY_MAPPING_TOKEN,
  PLAYER_COLLECTION_SUBSCRIPTION_TOKEN
);
export const MatchCollectionSubscriptionFactory = createCollectionSubscriptionFactory<Match>(
  'match',
  MATCH_REPOSITORY_MAPPING_TOKEN,
  MATCH_COLLECTION_SUBSCRIPTION_TOKEN
);
export const MatchStatsCollectionSubscriptionFactory = createCollectionSubscriptionFactory<MatchStatistics>(
  'matchStatistic',
  MATCH_STATS_REPOSITORY_MAPPING_TOKEN,
  MATCH_STATS_COLLECTION_SUBSCRIPTION_TOKEN
);

export const UsersCollectionSubscriptionFactory = createCollectionSubscriptionFactory<Users>(
  'usuario',
  USER_REPOSITORY_MAPPING_TOKEN,
  USERS_COLLECTION_SUBSCRIPTION_TOKEN
);

