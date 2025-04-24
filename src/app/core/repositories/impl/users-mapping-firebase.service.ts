import { Inject, Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Player } from "../../models/players.model";
import { doc, Firestore, getFirestore } from "firebase/firestore";
import { Paginated } from "../../models/paginated.model";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";
import { initializeApp } from "firebase/app";
import { FirebasePlayer } from "../../models/firebase-player.model";
import { Users } from "../../models/users.model";
import { FirebaseUser } from "../../models/firebase-user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersMappingFirebase implements IBaseMapping<Users>{
  
  private db: Firestore;
  
  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
    this.db = getFirestore(initializeApp(firebaseConfig))
  }
  getPaginated(page: number, pageSize: number, total: number, data: ({ id: string } & FirebaseUser)[]): Paginated<Users> {
    return{
      page,
      pageSize,
      pages: Math.ceil(total/pageSize),
      data: data.map(item => this.getOne(item))
    }
  }
  getOne(data: { id: string } & FirebaseUser): Users {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      picture: data.picture ? {
        url: data.picture,
        large: data.picture,
        medium: data.picture,
        small: data.picture,
        thumbnail: data.picture
      }: undefined,
      role: data.role,
      userId: data.userId,
      playerFav: data.playerFav?.id,
      teamFav: data.teamFav?.id,
      leagueFav: data.leagueFav?.id      
    };
  }
  getAdded(data: { id: string } & FirebaseUser): Users {
    return this.getOne(data)
  }
  getUpdated(data: { id: string } & FirebaseUser): Users {
    return this.getOne(data)
  }
  getDeleted(data: { id: string } & FirebaseUser): Users {
    return this.getOne(data)
  }
  setAdd(data: Users): FirebaseUser {
    let dataMapping:FirebaseUser = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        userId: data.userId || '',
        picture: data.picture?.url || '',
        role: data.role,
    }
    if(data.playerFav){
      dataMapping.playerFav = doc(this.db, 'players', data.playerFav || '')
    }

    if(data.teamFav){
      dataMapping.teamFav = doc(this.db, 'teams', data.teamFav || '')
    }

    if(data.leagueFav){
      dataMapping.leagueFav = doc(this.db, 'leagues', data.leagueFav || '')
    }
    return dataMapping;
  }
  setUpdate(data: Partial<Users>): FirebaseUser {
    const result: any = {};
    if (data.name) result.name = data.name;
    if (data.surname) result.surname = data.surname;
    if (data.email) result.email = data.email;
    if (data.picture) result.picture = data.picture?.url || '';
    if (data.role) result.role  = data.role
    result.playerFav = data.playerFav ? doc(this.db, 'players', data.playerFav) : null;
    result.teamFav = data.teamFav ? doc(this.db, 'teams', data.teamFav) : null;
    result.leagueFav = data.leagueFav ? doc(this.db, 'leagues', data.leagueFav) : null;
    return result;
  }
  
  
}
