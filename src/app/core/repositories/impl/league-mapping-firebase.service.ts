import { Injectable, Inject } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, doc } from "firebase/firestore";
import { FirebaseLeague } from "../../models/firebase-league.model";
import { FirebasePlayer } from "../../models/firebase-player.model";
import { League } from "../../models/leagues.model";
import { Paginated } from "../../models/paginated.model";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";

@Injectable({
  providedIn: 'root'
})
export class LeagueMappingFirebaseService implements IBaseMapping<League>{
  
  private db: Firestore;
  
  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
    this.db = getFirestore(initializeApp(firebaseConfig))
  }
  getPaginated(page: number, pageSize: number, total: number, data: ({ id: string } & FirebasePlayer)[]): Paginated<League> {
    return{
      page,
      pageSize,
      pages: Math.ceil(total/pageSize),
      data: data.map(item => this.getOne(item))
    }
  }
  getOne(data: { id: string } & FirebaseLeague): League {
    return {
      id: data.id,
      name: data.name,
      userId: data.userId?.id 
    };
  }
  getAdded(data: { id: string } & FirebaseLeague): League {
    return this.getOne(data)
  }
  getUpdated(data: { id: string } & FirebaseLeague): League {
    return this.getOne(data)
  }
  getDeleted(data: { id: string } & FirebaseLeague): League {
    return this.getOne(data)
  }
  setAdd(data: League): FirebaseLeague {
    let dataMapping:FirebaseLeague = {
      name: data.name,
    };
    if(dataMapping.userId){
      dataMapping.userId = doc(this.db, 'leagues', data.userId || '')
    }
    return dataMapping;
  }
  setUpdate(data: Partial<League>): FirebaseLeague {
    const result: any = {};
    if (data.name) result.name = data.name;
    if (data.userId) result.user = data.userId || '';
    return result;
  }
  
  
}
