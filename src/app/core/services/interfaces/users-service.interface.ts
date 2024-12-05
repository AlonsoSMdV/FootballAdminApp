// src/app/services/interfaces/people.service.interface.ts
import { Observable } from 'rxjs';
import { Users } from '../../models/users.model';
import { IBaseService } from './base-service.interface';

export interface IPeopleService extends IBaseService<Users> {
  // Métodos específicos si los hay
  getByUserId(userId: string): Observable<Users | null>;
}
