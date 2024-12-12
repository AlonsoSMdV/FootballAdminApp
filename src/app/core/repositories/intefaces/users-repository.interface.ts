// src/app/core/repositories/interfaces/people-repository.interface.ts
import { Users } from "../../models/users.model";
import { IBaseRepository } from "./base-repository.interface";

export interface IUserRepository extends IBaseRepository<Users>{

}