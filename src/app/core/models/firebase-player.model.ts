import { DocumentReference } from "firebase/firestore";

export interface FirebasePlayer{
  name: string;
  firstSurname: string;
  secondSurname?: string;
  birthdate: Date;
  nationality: string;
  dorsal: number;
  position: string;
  team?: DocumentReference;
  picture?: string;
  userId?: DocumentReference;
}