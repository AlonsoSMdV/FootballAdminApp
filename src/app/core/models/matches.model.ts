import { Model } from "./base.model"

export interface Match extends Model{
    day: Date,
    hour: Date,
    result: string, 
    place: string,
    status: string,
    localTeamId?: string,
    visitorTeamId?: string,
    userId?: string
}