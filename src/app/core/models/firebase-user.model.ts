export interface FirebaseUser{
    name:string,
    surname:string,
    email?:string, //TODO: Quitar interrogación más adelante
    picture?:string,
    role:string,
    userId: string
}
    