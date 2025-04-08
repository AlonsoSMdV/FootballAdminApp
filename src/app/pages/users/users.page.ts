import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/core/models/users.model';
import { UsersService } from 'src/app/core/services/impl/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: Users[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(event?: any): void {
    this.usersService.getAll().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.users = data;
        } else {
          this.users = data?.data || [];
        }
        if (event) event.target.complete();
      },
      error: err => {
        console.error('Error cargando usuarios:', err);
        if (event) event.target.complete();
      }
    });
  }

  updateUserRole(user: any) {
    // Aquí iría tu llamada a API o lógica
    console.log(`Rol actualizado a "${user.role}" para:`, user);
    // this.userService.updateRole(user.id, user.role).subscribe(...)
  }
}
