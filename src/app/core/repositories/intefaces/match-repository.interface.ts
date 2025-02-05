import { League } from "../../models/leagues.model";
import { Match } from "../../models/matches.model";
import { IBaseRepository } from "./base-repository.interface";

export interface IMatchRepository extends IBaseRepository<Match>{}