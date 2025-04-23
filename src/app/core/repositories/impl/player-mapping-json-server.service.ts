import { Injectable } from "@angular/core";
import { Paginated } from "../../models/paginated.model";
import { Player } from "../../models/players.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";

interface PlayerRaw{
  id?: string
  nombre: string
  ape1: string;
  ape2?: string;
  fechNacimiento: Date;
  nacionalidad: string
  dorsal: number
  posicion:string
  idEquipo: string

}

@Injectable({
  providedIn: 'root'
})
export class PlayerJsonServerStorageMapping implements IBaseMapping<Player> {
  setAdd(data: Player):PlayerRaw {
      return{
          nombre:data.name,
          ape1:data.firstSurname,
          ape2:data.secondSurname,
          fechNacimiento:data.birthdate,
          nacionalidad:data.nationality,
          dorsal:data.dorsal,
          posicion:data.position,
          idEquipo:''
      }
  }
  setUpdate(data: Player):PlayerRaw {
      let toReturn:any = {};
      Object.keys(data).forEach(key => {
          switch (key) {
              case 'name': toReturn['nombre']=data[key];
                  break;
              case 'firstSurname': toReturn['ape1']=data[key];
                  break;
              case 'secondSurname': toReturn['ape2']=data[key];
                  break;
              case 'birthdate': toReturn['fechNacimiento']=data[key];
                  break;
              case 'nationality': toReturn['nacionalidad']=data[key];
                  break;
              case 'dorsal': toReturn['dorsal']=data[key];
                  break;
              case 'position': toReturn['posicion']=data[key];
                  break;
              case 'team': toReturn['idEquipo']=data[key];
                  break;
          
              default:
                  break;
          }
      });
      return toReturn;
  }
  getPaginated(page:number, pageSize: number, pages:number, data:PlayerRaw[]): Paginated<Player> {
      return {page:page, pageSize:pageSize, pages:pages, data:data.map<Player>((d:PlayerRaw)=>{
          return this.getOne(d);
      })};
  }
  getOne(data: PlayerRaw):Player {
      return {
          id:data.id!, 
          name:data.nombre, 
          firstSurname:data.ape1,
          secondSurname:data.ape2,
          birthdate:data.fechNacimiento,
          nationality:data.nacionalidad,
          dorsal:data.dorsal,
          position:data.posicion,
          team:data.idEquipo,
      };
  }
  getAdded(data: any):Player {
      throw new Error("Method not implemented.");
  }
  getUpdated(data: any):Player {
      throw new Error("Method not implemented.");
  }
  getDeleted(data: any):Player {
      throw new Error("Method not implemented.");
  }
}