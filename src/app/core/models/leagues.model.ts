import { Model } from "./base.model";
export interface League extends Model{
  name: string;
  userId?: string;
}