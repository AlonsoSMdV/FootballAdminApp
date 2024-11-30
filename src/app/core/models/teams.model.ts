import { Model } from "./base.model";

export interface Team extends Model{
  name: string;
  numberOfPlayers: number;
  leagueId?: string;
}