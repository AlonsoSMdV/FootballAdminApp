import { Injectable, Inject } from "@angular/core";
import { Player } from "../../models/players.model";
import { PLAYER_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IPlayerService } from "../interfaces/player-service.interface";
import { BaseService } from "./base-service.service";
import { IPlayerRepository } from "../../repositories/intefaces/player-repository.interface";

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService<Player> implements IPlayerService {
  constructor(
    @Inject(PLAYER_REPOSITORY_TOKEN) repository: IPlayerRepository
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}