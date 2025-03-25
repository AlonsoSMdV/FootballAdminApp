import { Injectable } from "@angular/core"
import { League } from "../../models/leagues.model"
import { Paginated } from "../../models/paginated.model"
import { StrapiMedia } from "../../services/impl/strapi-media.service"
import { IBaseMapping } from "../intefaces/base-mapping.interface"

export interface MediaRaw{
  data: StrapiMedia
}

export interface LeagueRaw{
  data: Data
  meta: Meta
}

export interface Data{
  id: number
  attributes: LeagueAttributes
}

export interface LeagueData{
  data: LeagueAttributes
}

export interface LeagueAttributes{
  name: string
  isFavourite: boolean
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface Meta{}

@Injectable({
  providedIn: 'root'
})
export class LeagueMappingStrapi implements IBaseMapping<League> {
  

  setAdd(data: League):LeagueData {
      return {
          data:{
              name:data.name,
              isFavourite: data.isFavourite
          }
      };
  }
  setUpdate(data: League):LeagueData {
      let toReturn:LeagueData = {
          data:{
              name:"",
              isFavourite: false
          }
      };  
      Object.keys(data).forEach(key=>{
          switch(key){
              case 'name': toReturn.data['name']=data[key];
              break;
              case 'isFavourite' : toReturn.data['isFavourite']=data[key]
              break;
              default:
          }
      });
      return toReturn;
  }
  getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<League> {
      return {page:page, pageSize:pageSize, pages:pages, data:data.map<League>((d:Data)=>{
          return this.getOne(d);
      })};
  }
  getOne(data: Data | LeagueRaw): League {
      const isLeagueRaw = (data: Data | LeagueRaw): data is LeagueRaw => 'meta' in data;
      
      const attributes = isLeagueRaw(data) ? data.data.attributes : data.attributes;
      const id = isLeagueRaw(data) ? data.data.id : data.id;

      return {
          id: id.toString(),
          name: attributes.name,
          isFavourite: attributes.isFavourite
      };
  }
  getAdded(data: LeagueRaw):League {
      return this.getOne(data.data);
  }
  getUpdated(data: LeagueRaw):League {
      return this.getOne(data.data);
  }
  getDeleted(data: LeagueRaw):League {
      return this.getOne(data.data);
  }
}