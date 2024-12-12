import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Users } from "../../models/users.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";


interface MediaRaw{
    data: StrapiMedia
}
interface UserRaw{
    data: UserData
}

interface UserData{
    id: number
    attributes: UserAttributes
}

interface UserAttributes {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }

  
  

interface PersonRaw {
    data: Data
    meta: Meta
  }
  
interface Data {
    id: number
    attributes: PersonAttributes
}
interface PersonData {
    data: PersonAttributes;
}

interface PersonAttributes {
    name: string
    surname: string
    gender: string
    birthdate?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    user:UserRaw | number | null,
    picture:MediaRaw | number | null
}


interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class UsersMappingStrapi implements IBaseMapping<Users> {
    toGenderMapping:any = {
        Masculino:'male',
        Femenino:'female',
        Otros:'other'
    };
    
    fromGenderMapping:any = {
        male:'Masculino',
        female:'Femenino',
        other:'Otros'
    };

    setAdd(data: Users):PersonData {
        return {
            data:{
                name:data.name,
                surname:data.surname,
                gender: this.toGenderMapping[data.gender],
                user:data.userId?Number(data.userId):null,
                picture:data.picture?Number(data.picture):null
            }
        };
    }
    setUpdate(data: Partial<Users>): PersonData {
        const mappedData: Partial<PersonAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'name': mappedData.name = data[key];
                break;
                case 'surname': mappedData.surname = data[key];
                break;
                case 'gender': mappedData.gender = this.toGenderMapping[data[key]!];
                break;
                break;
                case 'userId': mappedData.user = data[key] ? Number(data[key]) : null;
                break;
                case 'picture': mappedData.picture = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as PersonAttributes
        };
    }

    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Users> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Users>((d:Data|PersonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | PersonRaw): Users {
        const isPersonRaw = (data: Data | PersonRaw): data is PersonRaw => 'meta' in data;

        const attributes = isPersonRaw(data) ? data.data.attributes : data.attributes;
        const id = isPersonRaw(data) ? data.data.id : data.id;
        
        return {
            id: id.toString(),
            name: attributes.name,
            surname: attributes.surname,
            gender: this.fromGenderMapping[attributes.gender],
            userId: typeof attributes.user === 'object' ? attributes.user?.data?.id.toString() : undefined,
            picture: typeof attributes.picture === 'object' ? {
                url: attributes.picture?.data?.attributes?.url,
                large: attributes.picture?.data?.attributes?.formats?.large?.url || attributes.picture?.data?.attributes?.url,
                medium: attributes.picture?.data?.attributes?.formats?.medium?.url || attributes.picture?.data?.attributes?.url,
                small: attributes.picture?.data?.attributes?.formats?.small?.url || attributes.picture?.data?.attributes?.url,
                thumbnail: attributes.picture?.data?.attributes?.formats?.thumbnail?.url || attributes.picture?.data?.attributes?.url,
            } : undefined
        };
    }
    getAdded(data: PersonRaw):Users {
        return this.getOne(data.data);
    }
    getUpdated(data: PersonRaw):Users {
        return this.getOne(data.data);
    }
    getDeleted(data: PersonRaw):Users {
        return this.getOne(data.data);
    }
  }
  