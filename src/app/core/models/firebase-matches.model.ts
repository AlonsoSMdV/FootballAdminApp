import { DocumentReference, Timestamp } from "firebase/firestore";

export interface FirebaseMatch{
    day: Date,
    hour: Date,
    result: string, 
    place: string
    localTeamId?: DocumentReference,
    visitorTeamId?: DocumentReference,
    userId?: DocumentReference;
}