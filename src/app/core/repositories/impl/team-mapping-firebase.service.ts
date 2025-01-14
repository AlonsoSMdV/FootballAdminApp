import { Injectable, Inject } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, doc } from "firebase/firestore";
import { FirebaseTeam } from "../../models/firebase-team.model";
import { Paginated } from "../../models/paginated.model";
import { Team } from "../../models/teams.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";

@Injectable({
  providedIn: 'root'
})
export class TeamMappingFirebaseService implements IBaseMapping<Team>{
  
  private db: Firestore;
  
  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
    this.db = getFirestore(initializeApp(firebaseConfig))
  }
  getPaginated(page: number, pageSize: number, total: number, data: ({ id: string } & FirebaseTeam)[]): Paginated<Team> {
    return{
      page,
      pageSize,
      pages: Math.ceil(total/pageSize),
      data: data.map(item => this.getOne(item))
    }
  }
  getOne(data: { id: string } & FirebaseTeam): Team {
    return {
      id: data.id,
      name: data.name,
      numberOfPlayers: data.numberOfPlayers,
      league: data.league?.id,
      userId: data.userId?.id 
    };
  }
  getAdded(data: { id: string } & FirebaseTeam): Team {
    return this.getOne(data)
  }
  getUpdated(data: { id: string } & FirebaseTeam): Team {
    return this.getOne(data)
  }
  getDeleted(data: { id: string } & FirebaseTeam): Team {
    return this.getOne(data)
  }
  setAdd(data: Team): FirebaseTeam {
    let dataMapping:FirebaseTeam = {
      name: data.name,
      numberOfPlayers: data.numberOfPlayers
    }
    if(dataMapping.league){
      dataMapping.league = doc(this.db, 'leagues', data.league || '')
    }
    if(dataMapping.userId){
      dataMapping.userId = doc(this.db, 'team', data.userId || '')
    }
    return dataMapping;
  }
  setUpdate(data: Partial<Team>): FirebaseTeam {
    const result: any = {};
    if (data.name) result.name = data.name;
    if (data.numberOfPlayers) result.numberOfPlayers = data.numberOfPlayers;
    if (data.league) result.league = doc(this.db, 'leagues', data.league || '');
    if (data.userId) result.user = data.userId || '';
    return result;
  }
  
  
}
