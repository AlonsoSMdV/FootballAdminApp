import { Injectable, Inject } from "@angular/core";
import { League } from "../../models/leagues.model";
import { LEAGUE_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { ILeagueService } from "../interfaces/league-service.interface";
import { BaseService } from "./base-service.service";

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseService<League> implements ILeagueService {
  constructor(
    @Inject(LEAGUE_REPOSITORY_TOKEN) repository: ILeagueService
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}