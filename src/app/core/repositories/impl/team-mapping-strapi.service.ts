import { Injectable } from "@angular/core"
import { Paginated } from "../../models/paginated.model"
import { Team } from "../../models/teams.model"
import { StrapiMedia } from "../../services/impl/strapi-media.service"
import { IBaseMapping } from "../intefaces/base-mapping.interface"

interface MediaRaw{
  data: StrapiMedia
}

interface TeamRaw{
  data: Data
}

interface Data{
  id: number
  attributes: TeamAttributes
}

interface TeamData{
  data: TeamAttributes
}

interface TeamAttributes{
  name: string
  numberOfPlayers: number
  league: LeagueRaw | number | null
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

interface LeagueRaw{
  data: LeagueData
  meta: Meta
}

interface LeagueData{
  id: number
  attributes: LeagueAttributes
}

interface LeagueData{
  data: LeagueAttributes
}

interface LeagueAttributes{
  name: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

interface Meta{}

@Injectable({
  providedIn: 'root'
})
export class TeamMappingStrapi implements IBaseMapping<Team> {
  

  setAdd(data: Team):TeamData {
      return {
          data:{
              name: data.name,
              numberOfPlayers: data.numberOfPlayers,
              league: data.league?Number(data.league): null
          }
      };
  }
  setUpdate(data: Team):TeamData {
      const mappedData: Partial<TeamAttributes> = {} 
      Object.keys(data).forEach(key=>{
          switch(key){
              case 'name': mappedData.name=data[key];
              break;
              case 'numberOfPlayers': mappedData.numberOfPlayers=data[key];
              break;
              case 'league': mappedData.league=data[key] ? Number(data[key]) : null;
              break;
              
              default:
          }
      });
      return {data: mappedData as TeamAttributes};
  }
  getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Team> {
      return {page:page, pageSize:pageSize, pages:pages, data:data.map<Team>((d:Data)=>{
          return this.getOne(d);
      })};
  }
  getOne(data: Data | TeamRaw): Team {
      const isTeamRaw = (data: Data | TeamRaw): data is TeamRaw => 'meta' in data;
      
      const attributes = isTeamRaw(data) ? data.data.attributes : data.attributes;
      const id = isTeamRaw(data) ? data.data.id : data.id;

      return {
          id: id.toString(),
          name: attributes.name,
          numberOfPlayers: attributes.numberOfPlayers,
          league: typeof attributes.league === 'object' ? attributes.league?.data?.id.toString() : undefined
      };
  }
  getAdded(data: TeamRaw):Team {
      return this.getOne(data.data);
  }
  getUpdated(data: TeamRaw):Team {
      return this.getOne(data.data);
  }
  getDeleted(data: TeamRaw):Team {
      return this.getOne(data.data);
  }
}