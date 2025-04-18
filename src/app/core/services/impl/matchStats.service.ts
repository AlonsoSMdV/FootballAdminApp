import { Injectable, Inject } from "@angular/core";
import { MatchStatistics } from "../../models/matchStatistics.model";
import { MATCH_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IMatchStatsService } from "../interfaces/matchStatistics-service.interface";
import { BaseService } from "./base-service.service";

@Injectable({
  providedIn: 'root'
})
export class MatchStatsService extends BaseService<MatchStatistics> implements IMatchStatsService {
  constructor(
    @Inject(MATCH_REPOSITORY_TOKEN) repository: IMatchStatsService
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}