import { DocumentReference } from "firebase/firestore"
export interface FirebaseTeam{
  name: string;
  numberOfPlayers: number;
  league?: DocumentReference;
  userId?: DocumentReference;
  picture?: string;
}