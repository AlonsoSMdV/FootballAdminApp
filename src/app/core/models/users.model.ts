// src/app/core/person.model.ts
import { Model } from "./base.model";

export interface Users extends Model{
    name:string,
    surname:string,
    email?:string, //TODO: Quitar interrogación más adelante
    picture?:{
        url:string | undefined,
        large:string | undefined,
        medium:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
    role:string,
    userId?:string,
    playerFav?:string,
    teamFav?:string,
    leagueFav?:string,
}