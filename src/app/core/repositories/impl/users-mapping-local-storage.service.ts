import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Users } from "../../models/users.model";

interface PersonRaw{
    id:string,
    name:{
        title:string;
        first:string;
        last:string;
    },
    age:number,
    genero:string,
    picture:{
        url:string,
        large:string,
        medium:string,
        small:string,
        thumbnail:string
    }
}

@Injectable({
    providedIn: 'root'
  })
  export class UsersLocalStorageMapping implements IBaseMapping<Users> {
    setAdd(data: Users) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize:number, pages:number, data: PersonRaw[]): Paginated<Users> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Users>((d:PersonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: PersonRaw):Users {
        return {
            id:data.id, 
            name:data.name.first, 
            surname:data.name.last, 
            age:data.age,
            gender:data.genero,
            picture:{
                url:data.picture.url,
                large:data.picture.large, 
                medium:data.picture.medium,
                small:data.picture.small,
                thumbnail:data.picture.thumbnail
            }};
    }
    getAdded(data: PersonRaw):Users {
        return this.getOne(data);
    }
    getUpdated(data: PersonRaw):Users {
        return this.getOne(data);
    }
    getDeleted(data: PersonRaw):Users {
        return this.getOne(data);
    }
  }
  