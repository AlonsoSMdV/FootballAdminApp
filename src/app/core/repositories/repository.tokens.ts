// src/app/repositories/repository.tokens.ts
import { InjectionToken } from '@angular/core';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { IUserRepository } from './intefaces/users-repository.interface';
import { IBaseMapping } from './intefaces/base-mapping.interface';
import { Users } from '../models/users.model';
import { IStrapiAuthentication } from '../services/interfaces/strapi-authentication.interface';
import { IAuthentication } from '../services/interfaces/authentication.interface';
import { League } from '../models/leagues.model';
import { Player } from '../models/players.model';
import { Team } from '../models/teams.model';
import { ILeagueRepository } from './intefaces/league-repository.interface';
import { IPlayerRepository } from './intefaces/player-repository.interface';
import { ITeamRepository } from './intefaces/team-repository.interface';

export const RESOURCE_NAME_TOKEN = new InjectionToken<string>('ResourceName');
export const LEAGUE_RESOURCE_NAME_TOKEN = new InjectionToken<string>('LeagueResourceName');
export const TEAM_RESOURCE_NAME_TOKEN = new InjectionToken<string>('TeamResourceName');
export const PLAYER_RESOURCE_NAME_TOKEN = new InjectionToken<string>('PlayerResourceName');
export const USER_RESOURCE_NAME_TOKEN = new InjectionToken<string>('UserResourceName');
export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN');
export const USER_REPOSITORY_TOKEN = new InjectionToken<IUserRepository>('IUserRepository');
export const LEAGUE_REPOSITORY_TOKEN = new InjectionToken<ILeagueRepository>('ILeagueRepository');
export const PLAYER_REPOSITORY_TOKEN = new InjectionToken<IPlayerRepository>('IPlayerRepository');
export const TEAM_REPOSITORY_TOKEN = new InjectionToken<ITeamRepository>('ITeamRepository');

export const API_URL_TOKEN = new InjectionToken<string>('ApiUrl');
export const LEAGUE_API_URL_TOKEN = new InjectionToken<string>('LeagueApiUrl');
export const TEAM_API_URL_TOKEN = new InjectionToken<string>('TeamApiUrl');
export const PLAYER_API_URL_TOKEN = new InjectionToken<string>('PlayerApiUrl');
export const USER_API_URL_TOKEN = new InjectionToken<string>('UserApiUrl');
export const AUTH_SIGN_IN_API_URL_TOKEN = new InjectionToken<string>('AuthSignInApiUrl');
export const AUTH_SIGN_UP_API_URL_TOKEN = new InjectionToken<string>('AuthSignUpApiUrl');
export const AUTH_ME_API_URL_TOKEN = new InjectionToken<string>('AuthMeApiUrl');
export const UPLOAD_API_URL_TOKEN = new InjectionToken<string>('UploadApiUrl');

export const REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('IBaseRepositoryMapping');
export const USER_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Users>>('IUserRepositoryMapping');
export const LEAGUE_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<League>>('ILeaguesRepositoryMapping');
export const PLAYER_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Player>>('IPlayerRepositoryMapping');
export const TEAM_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Team>>('ITeamRepositoryMapping');
export const AUTH_TOKEN = new InjectionToken<IAuthentication>('IAuthentication');
export const STRAPI_AUTH_TOKEN = new InjectionToken<IStrapiAuthentication>('IStrapiAuthentication');
export const AUTH_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Users>>('IAuthMapping');
export const BACKEND_TOKEN = new InjectionToken<string>('Backend');
export const FIREBASE_CONFIG_TOKEN = new InjectionToken<string>('FirebaseConfigToken')
export const FIREBASE_COLLECTION_TOKEN = new InjectionToken<string>('FirebaseCollectionToken')