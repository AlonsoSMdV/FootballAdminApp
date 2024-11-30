import { Injectable } from "@angular/core";
import { League } from "../../models/leagues.model";
import { Paginated } from "../../models/paginated.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";

interface LeagueRaw{
  id: string
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class LeagueJsonServerStorageMapping implements IBaseMapping<League> {
  setAdd(data: League):LeagueRaw {
      return {
          id:data.id,
          nombre:data.name
      }
  }
  setUpdate(data: League):LeagueRaw {
      let toReturn:any = {};
      Object.keys(data).forEach(key => {
          switch (key) {
              case 'name': toReturn['nombre']=data[key];
                  break;
              default:
                  break;
          }
      });
      return toReturn;
  }
  getPaginated(page:number, pageSize: number, pages:number, data:LeagueRaw[]): Paginated<League> {
      return {page:page, pageSize:pageSize, pages:pages, data:data.map<League>((d:LeagueRaw)=>{
          return this.getOne(d);
      })};
  }
  getOne(data: LeagueRaw):League {
      return {
          id:data.id, 
          name:data.nombre, 
      };
  }
  getAdded(data: any):League {
      throw new Error("Method not implemented.");
  }
  getUpdated(data: any):League {
      throw new Error("Method not implemented.");
  }
  getDeleted(data: any):League {
      throw new Error("Method not implemented.");
  }
}