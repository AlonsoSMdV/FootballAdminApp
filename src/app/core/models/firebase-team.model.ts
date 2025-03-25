import { DocumentReference } from "firebase/firestore"
export interface FirebaseTeam{
  name: string;
  numberOfPlayers: number;
  pts: number,
  nMatches: number,
  isFavourite: boolean,
  league?: DocumentReference;
  userId?: DocumentReference;
  picture?: string;
}