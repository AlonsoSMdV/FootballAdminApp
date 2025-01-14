import { Model } from "./base.model";

export interface Player extends Model{
  name: string;
  firstSurname: string;
  secondSurname?: string;
  birthdate: Date;
  nationality: string;
  dorsal: number;
  position: string;
  team?: string;
  userId?: string;
}