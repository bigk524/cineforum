import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { firstValueFrom, Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
  standalone: false,
})
export class AdminPanelPage implements OnInit, OnDestroy {
  users: Usuario[] = [];
  private subscription!: Subscription;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private dbService: DbService
  ) {}


  async banUser(id: number) {
    const alert = await this.alertController.create({
      header: 'Bannear Usuario',
      inputs: [
        {
          name: 'razon',
          type: 'text',
          placeholder: 'Razón del baneo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Banear',
          handler: async (data) => {
            if (data.razon) {
              await this.dbService.bannearUsuario(id, data.razon);
              await this.dbService.loadBannedUsers() // Recargar usuarios banneados
              this.showToast(`Usuario ha sido baneado correctamente.`);
              console.log(`Usuario ID: ${id} baneado.`);
            } else {
              console.error('La razón de banneo es requerida.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  trackByFn(_index: number, user: Usuario): number {
    return user.id;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  ngOnInit() { 
    this.dbService.loadBannedUsers().then(() => {
      this.subscription = this.dbService.fetchUsuario().subscribe({
        next: (data) => {
          this.users = data;
          console.log('Users loaded:', this.users);
        },
        error: (error) => console.error('Error loading users:', error)
      });
    });
  }

  ngOnDestroy(): void {
    this.dbService.loadBannedUsers().then(() => {
      this.subscription = this.dbService.fetchUsuario().subscribe({
         next: (data) => {
          this.users = data;
          console.log('Users loaded', JSON.stringify(this.users));
         },
         error: (error) => console.error('Error loading users', JSON.stringify(error))
      });
    });
  }

  isUserBanned(userId: number): boolean {
    return this.dbService.isUserBanned(userId);
  }
}
