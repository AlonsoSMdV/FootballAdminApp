import { Injectable, Inject } from "@angular/core";
import { Player } from "../../models/players.model";
import { PLAYER_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IPlayerService } from "../interfaces/player-service.interface";
import { BaseService } from "./base-service.service";
import { IPlayerRepository } from "../../repositories/intefaces/player-repository.interface";
import { SearchParams } from "../../repositories/intefaces/base-repository.interface";
import { from, map, Observable } from "rxjs";
import { Paginated } from "../../models/paginated.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService<Player> implements IPlayerService {
  constructor(
    @Inject(PLAYER_REPOSITORY_TOKEN) repository: IPlayerRepository
  ) {
    super(repository);
  }

  getPlayersByTeam(team: string, page: number, pageSize: number): Observable<Paginated<Player>> {
      const teamId = team.split('/').pop() ?? team;
      const filters = { team: teamId };
      return this.repository.getAll(page, pageSize, filters) as Observable<Paginated<Player>>;
    }

  // Implementa métodos específicos si los hay
}