import { Injectable, Inject } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, doc } from "firebase/firestore";
import { FirebaseMatch } from "../../models/firebase-matches.model";
import { Match } from "../../models/matches.model";
import { Paginated } from "../../models/paginated.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";

@Injectable({
  providedIn: 'root'
})
export class MatchMappingFirebase implements IBaseMapping<Match>{
  
  private db: Firestore;
  
  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
    this.db = getFirestore(initializeApp(firebaseConfig))
  }
  getPaginated(page: number, pageSize: number, total: number, data: ({ id: string } & FirebaseMatch)[]): Paginated<Match> {
    return{
      page,
      pageSize,
      pages: Math.ceil(total/pageSize),
      data: data.map(item => this.getOne(item))
    }
  }
  getOne(data: { id: string } & FirebaseMatch): Match {
    return {
      id: data.id,
      day: data.day,
      hour: data.hour,
      result: data.result,
      place: data.place,
      status: data.status,
      localTeamId: data.localTeamId?.id,
      visitorTeamId: data.visitorTeamId?.id,
      userId: data.userId?.id 
    };
  }
  getAdded(data: { id: string } & FirebaseMatch): Match {
    return this.getOne(data)
  }
  getUpdated(data: { id: string } & FirebaseMatch): Match {
    return this.getOne(data)
  }
  getDeleted(data: { id: string } & FirebaseMatch): Match {
    return this.getOne(data)
  }
  setAdd(data: Match): FirebaseMatch {
    let dataMapping:FirebaseMatch = {
        day: data.day,
        hour: data.hour,
        result: data.result,
        place: data.place,
        status: data.status
    };
    if(data.localTeamId){
        dataMapping.localTeamId = doc(this.db, 'teams', data.localTeamId || '')
      }
      
    if(data.visitorTeamId){
    dataMapping.visitorTeamId = doc(this.db, 'teams', data.visitorTeamId || '')
    }

    if(data.userId){
      dataMapping.userId = doc(this.db, 'usuarios', data.userId || '')
    }
    return dataMapping;
  }
  setUpdate(data: Partial<Match>): FirebaseMatch {
    const result: any = {};
    if (data.day) result.day = data.day;
    if (data.hour) result.hour = data.hour;
    if (data.result) result.result = data.result;
    if (data.place) result.place = data.place;
    if (data.status) result.status = data.status;
    if (data.localTeamId) result.localTeamId = doc(this.db, 'teams', data.localTeamId || '');
    if (data.visitorTeamId) result.visitorTeamId = doc(this.db, 'teams', data.visitorTeamId || '');
    if (data.userId) result.user = doc(this.db, 'usuarios', data.userId || '');
    return result;
  }
  
  
}
