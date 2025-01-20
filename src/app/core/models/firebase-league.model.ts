import { DocumentReference } from "firebase/firestore";

export interface FirebaseLeague{
  name: string;
  picture?: string;
  userId?: DocumentReference;
}