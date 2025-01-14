import { DocumentReference } from "firebase/firestore";

export interface FirebaseLeague{
  name: string;
  userId?: DocumentReference;
}