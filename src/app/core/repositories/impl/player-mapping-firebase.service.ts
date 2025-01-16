import { Inject, Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Player } from "../../models/players.model";
import { doc, Firestore, getFirestore } from "firebase/firestore";
import { Paginated } from "../../models/paginated.model";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";
import { initializeApp } from "firebase/app";
import { FirebasePlayer } from "../../models/firebase-player.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerMappingFirebase implements IBaseMapping<Player>{
  
  private db: Firestore;
  
  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
    this.db = getFirestore(initializeApp(firebaseConfig))
  }
  getPaginated(page: number, pageSize: number, total: number, data: ({ id: string } & FirebasePlayer)[]): Paginated<Player> {
    return{
      page,
      pageSize,
      pages: Math.ceil(total/pageSize),
      data: data.map(item => this.getOne(item))
    }
  }
  getOne(data: { id: string } & FirebasePlayer): Player {
    return {
      id: data.id,
      name: data.name,
      firstSurname: data.firstSurname,
      secondSurname: data.secondSurname,
      birthdate: data.birthdate,
      nationality: data.nationality,
      dorsal: data.dorsal,
      position: data.position,
      team: data.team?.id,
      userId: data.userId?.id 
    };
  }
  getAdded(data: { id: string } & FirebasePlayer): Player {
    return this.getOne(data)
  }
  getUpdated(data: { id: string } & FirebasePlayer): Player {
    return this.getOne(data)
  }
  getDeleted(data: { id: string } & FirebasePlayer): Player {
    return this.getOne(data)
  }
  setAdd(data: Player): FirebasePlayer {
    let dataMapping:FirebasePlayer = {
      name: data.name,
      firstSurname: data.firstSurname,
      secondSurname: data.secondSurname,
      birthdate: data.birthdate,
      nationality: data.nationality,
      dorsal: data.dorsal,
      position: data.position
    }
    if(dataMapping.team){
      dataMapping.team = doc(this.db, 'teams', data.team || '')
    }
    if(dataMapping.userId){
      dataMapping.userId = doc(this.db, 'players', data.userId || '')
    }
    return dataMapping;
  }
  setUpdate(data: Partial<Player>): FirebasePlayer {
    const result: any = {};
    if (data.name) result.name = data.name;
    if (data.firstSurname) result.firstSurname = data.firstSurname;
    if (data.secondSurname) result.secondSurname = data.secondSurname;
    if (data.birthdate) result.birthdate = data.birthdate;
    if (data.nationality) result.nationality = data.nationality;
    if (data.dorsal) result.dorsal = data.dorsal;
    if (data.position) result.position = data.position;
    if (data.team) result.team = doc(this.db, 'team', data.team || '');
    if (data.userId) result.user = data.userId || '';
    return result;
  }
  
  
}
