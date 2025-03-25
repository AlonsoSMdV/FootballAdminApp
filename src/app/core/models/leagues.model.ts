import { Model } from "./base.model";
export interface League extends Model{
  name: string;
  isFavourite: boolean,
  picture?:{
    url: string | undefined,
    large: string | undefined,
    medium: string | undefined,
    small: string | undefined,
    thumbnail: string | undefined,
  };
  userId?: string;
}