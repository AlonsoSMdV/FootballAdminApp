import { Injectable, Inject } from "@angular/core";
import { Match } from "../../models/matches.model";
import { IMatchRepository } from "../../repositories/intefaces/match-repository.interface";
import { MATCH_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IMatchService } from "../interfaces/match-service.interface";
import { BaseService } from "./base-service.service";

@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService<Match> implements IMatchService {
  constructor(
    @Inject(MATCH_REPOSITORY_TOKEN) repository: IMatchRepository
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}