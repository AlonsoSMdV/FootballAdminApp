import { SignInPayload, SignUpPayload, User } from "../../models/auth.model";
import { Users } from "../../models/users.model";

export interface IAuthMapping{
    signInPayload(payload:SignInPayload):any;
    signUpPayload(payload:SignUpPayload):any;
    signIn(response:any):User;
    signUp(response:any):User;
    me(response:any):User;
  }