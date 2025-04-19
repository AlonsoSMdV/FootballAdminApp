import { Injectable, Inject } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, doc } from "firebase/firestore";
import { FirebaseMatchStatistics } from "../../models/firebase-matchStatistics.model";
import { MatchStatistics } from "../../models/matchStatistics.model";
import { Paginated } from "../../models/paginated.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";

@Injectable({
  providedIn: 'root'
})
export class MatchStatisticsMappingFirebase implements IBaseMapping<MatchStatistics>{
  
  private db: Firestore;
  
  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
    this.db = getFirestore(initializeApp(firebaseConfig))
  }
  getPaginated(page: number, pageSize: number, total: number, data: ({ id: string } & FirebaseMatchStatistics)[]): Paginated<MatchStatistics> {
    return{
      page,
      pageSize,
      pages: Math.ceil(total/pageSize),
      data: data.map(item => this.getOne(item))
    }
  }
  getOne(data: { id: string } & FirebaseMatchStatistics): MatchStatistics {
    return {
      id: data.id,
      matchId: data.matchId?.id,
      userId: data.userId?.id,
      stats: data.stats
    };
  }
  getAdded(data: { id: string } & FirebaseMatchStatistics): MatchStatistics {
    return this.getOne(data)
  }
  getUpdated(data: { id: string } & FirebaseMatchStatistics): MatchStatistics {
    return this.getOne(data)
  }
  getDeleted(data: { id: string } & FirebaseMatchStatistics): MatchStatistics {
    return this.getOne(data)
  }
  setAdd(data: MatchStatistics): FirebaseMatchStatistics {
    let dataMapping: FirebaseMatchStatistics = {
      stats: data.stats || [] 
    };
  
    if (data.matchId) {
      dataMapping.matchId = doc(this.db, 'matches', data.matchId || '');
    }
  
    if (data.userId) {
      dataMapping.userId = doc(this.db, 'usuarios', data.userId || '');
    }
  
    return dataMapping;
  }
  setUpdate(data: Partial<MatchStatistics>): FirebaseMatchStatistics {
    const result: any = {};
    if (data.stats) result.stats = data.stats;
    if (data.matchId) result.matchId = data.matchId;
    if (data.userId) result.user = doc(this.db, 'usuarios', data.userId || '');
    return result;
  }
  
  
}
