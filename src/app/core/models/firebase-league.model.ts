import { DocumentReference } from "firebase/firestore";

export interface FirebaseLeague{
  name: string;
  isFavourite: boolean,
  picture?: string;
  userId?: DocumentReference;
}