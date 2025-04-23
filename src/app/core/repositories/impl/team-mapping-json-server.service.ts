import { Injectable } from "@angular/core";
import { Paginated } from "../../models/paginated.model";
import { Team } from "../../models/teams.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";

interface TeamRaw{
  id: string
  nombre: string
  pts: number
  nMatches: number
  jugadoresEnPlantilla: number
  idLiga: string
}

@Injectable({
  providedIn: 'root'
})
export class TeamJsonServerStorageMapping implements IBaseMapping<Team> {
  setAdd(data: Team):TeamRaw {
      return {
          id:data.id, 
          nombre:data.name, 
          pts: data.pts,
          nMatches: data.nMatches,
          jugadoresEnPlantilla:data.numberOfPlayers,
          idLiga:data.league!,
      };
  }
  setUpdate(data: Team):TeamRaw {
      let toReturn:any = {};
      Object.keys(data).forEach(key => {
          switch (key) {
              case 'name': toReturn['nombre']=data[key];
                  break;
              case 'numberOfPlayers': toReturn['jugadoresEnPlantilla']=data[key];
                  break;
              case 'pts': toReturn['pts']=data[key];
                  break;
              case 'nMatches': toReturn['nMatches']=data[key];
                  break;
              case 'league': toReturn['idLiga']=data[key];
                  break;
              default:
                  break;
          }
      });
      return toReturn;
  }
  getPaginated(page:number, pageSize: number, pages:number, data:TeamRaw[]): Paginated<Team> {
      return {page:page, pageSize:pageSize, pages:pages, data:data.map<Team>((d:TeamRaw)=>{
          return this.getOne(d);
      })};
  }
  getOne(data: TeamRaw):Team {
      return {
          id:data.id, 
          name:data.nombre, 
          numberOfPlayers:data.jugadoresEnPlantilla,
          pts: data.pts,
          nMatches: data.nMatches,
          league:data.idLiga,
      };
  }
  getAdded(data: any):Team {
      throw new Error("Method not implemented.");
  }
  getUpdated(data: any):Team {
      throw new Error("Method not implemented.");
  }
  getDeleted(data: any):Team {
      throw new Error("Method not implemented.");
  }
}