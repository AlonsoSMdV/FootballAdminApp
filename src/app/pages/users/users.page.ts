import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Users } from 'src/app/core/models/users.model';
import { UsersService } from 'src/app/core/services/impl/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: Users[] = [];

  constructor(
    private usersService: UsersService,
    private toastController: ToastController
  ) {}

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

  async updateUserRole(user: Users): Promise<void> {
    const updatedUser: Partial<Users> = {
      role: user.role
    };
  
    this.usersService.update(user.id!, updatedUser as Users).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: `Usuario ${user.name} ahora es ${user.role}`,
          duration: 2500,
          position: 'bottom',
          color: 'success'
        });
        await toast.present();
      },
      error: async (err) => {
        console.error('Error al actualizar el rol:', err);
        const toast = await this.toastController.create({
          message: 'Hubo un error al actualizar el rol.',
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
