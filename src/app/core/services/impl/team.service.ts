import { Injectable, Inject } from "@angular/core";
import { Team } from "../../models/teams.model";
import { TEAM_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { ITeamService } from "../interfaces/team-service.interface";
import { BaseService } from "./base-service.service";
import { Observable } from "rxjs";
import { Paginated } from "../../models/paginated.model";
import { ITeamRepository } from "../../repositories/intefaces/team-repository.interface";

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<Team> implements ITeamService {
  constructor(
    @Inject(TEAM_REPOSITORY_TOKEN) repository: ITeamRepository
  ) {
    super(repository);
  }
  getTeamByLeague(league: string, page: number, pageSize: number): Observable<Paginated<Team>> {
    const formattedLeague = league.includes('/leagues/') ? league : `/leagues/${league}`
    const filters = {league: formattedLeague}
    return this.repository.getAll(page, pageSize, filters) as Observable<Paginated<Team>>
  }


  // Implementa métodos específicos si los hay
}