// src/app/core/person.model.ts
import { Model } from "./base.model";

export interface Users extends Model{
    name:string,
    surname:string,
    age?:number,
    email?:string, //TODO: Quitar interrogación más adelante
    picture?:{
        url:string | undefined,
        large:string | undefined,
        medium:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
    userId?:string
}