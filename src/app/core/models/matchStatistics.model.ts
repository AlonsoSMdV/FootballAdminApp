import { Model } from "./base.model";

export interface MatchStatistics extends Model {
  matchId?: string;
  userId?: string;
  stats: {
    name: string;
    localValue: number | string;
    visitorValue: number | string;
  }[];
}