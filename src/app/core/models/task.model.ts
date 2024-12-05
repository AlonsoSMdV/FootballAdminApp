import { Model } from "./base.model";
import { Users } from "./users.model";

export interface Task extends Model{
    owner:Users,
    date:Date
}