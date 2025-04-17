import { Model } from "./base.model";

export interface MatchStatistics extends Model {
  name: string;
  localValue: number | string;
  visitorValue: number | string;
}