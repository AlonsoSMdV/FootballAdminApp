// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { IUserService } from '../interfaces/users-service.interface';
import { Users } from '../../models/users.model';
import { USER_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IUserRepository } from '../../repositories/intefaces/users-repository.interface';
import { map, Observable, of, switchMap } from 'rxjs';
import { BaseAuthenticationService } from './base-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<Users> implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) repository: IUserRepository,
    private authSvc: BaseAuthenticationService
  ) {
    super(repository);
  }
  
  // Implementa métodos específicos si los hay
  getByUserId(userId: string): Observable<Users | null> {
    return this.repository.getAll(1, 1, {userId: userId}).pipe(
      map(res => Array.isArray(res) ? res[0] || null : res.data[0] || null)
    );
  }

  getCurrentUser(): Observable<Users | null> {
    return this.authSvc.user$.pipe(
      switchMap(authUser => {
        console.log('Auth user:', authUser);
        if (authUser?.id) {
          return this.getByUserId(authUser.id).pipe(
            map(user => {
              console.log('DB user:', user);
              return user;
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }
  

  
}
