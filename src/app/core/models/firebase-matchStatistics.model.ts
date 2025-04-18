import { DocumentReference } from "firebase/firestore";

export interface FirebaseMatchStatistics {
  matchId?: DocumentReference;
  userId?: DocumentReference;
  stats: {
    name: string;
    localValue: number | string;
    visitorValue: number | string;
  }[];
}