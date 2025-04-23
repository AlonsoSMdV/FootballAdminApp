import { Model } from "./base.model";

export interface Team extends Model{
  name: string;
  numberOfPlayers: number;
  pts: number,
  nMatches: number;
  league?: string;
  userId?: string;
  picture?:{
    url: string | undefined,
    large: string | undefined,
    medium: string | undefined,
    small: string | undefined,
    thumbnail: string | undefined,
  };
  
}