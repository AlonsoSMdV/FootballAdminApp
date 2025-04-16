import { Injectable, Inject } from "@angular/core";
import { Player } from "../../models/players.model";
import { PLAYER_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IPlayerService } from "../interfaces/player-service.interface";
import { BaseService } from "./base-service.service";
import { IPlayerRepository } from "../../repositories/intefaces/player-repository.interface";
import { SearchParams } from "../../repositories/intefaces/base-repository.interface";
import { from, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService<Player> implements IPlayerService {
  constructor(
    @Inject(PLAYER_REPOSITORY_TOKEN) repository: IPlayerRepository
  ) {
    super(repository);
  }

  getAllPlayersByTeam(teamId: string): Observable<Player[]> {
    const filters: SearchParams = { team: teamId };
    // Llama al método `getAll` del repositorio base
    return this.getAll(-1, 25, filters) as Observable<Player[]>;
  }

  // Implementa métodos específicos si los hay
}