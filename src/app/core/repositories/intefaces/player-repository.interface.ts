import { Player } from "../../models/players.model";
import { IBaseRepository } from "./base-repository.interface";

export interface IPlayerRepository extends IBaseRepository<Player>{}