import { Observable } from "rxjs";
import { Team } from "../../models/teams.model";
import { IBaseService } from "./base-service.interface";
import { Paginated } from "../../models/paginated.model";

export interface ITeamService extends IBaseService<Team>{

    getTeamByLeague(league: string, page: number, pageSize: number): Observable<Paginated<Team>>;
}