// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { IPeopleService } from '../interfaces/users-service.interface';
import { Users } from '../../models/users.model';
import { PEOPLE_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IPeopleRepository } from '../../repositories/intefaces/users-repository.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<Users> implements IPeopleService {
  constructor(
    @Inject(PEOPLE_REPOSITORY_TOKEN) repository: IPeopleRepository
  ) {
    super(repository);
  }
  
  // Implementa métodos específicos si los hay
  getByUserId(userId: string): Observable<Users | null> {
    return this.repository.getAll(1, 1, {user: userId}).pipe(
      map(res => Array.isArray(res) ? res[0] || null : res.data[0] || null)
    );
  }

  
}