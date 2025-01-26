import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-opciones-seguridad',
  templateUrl: './opciones-seguridad.page.html',
  styleUrls: ['./opciones-seguridad.page.scss'],
  standalone: false
})
export class OpcionesSeguridadPage implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  newPasswordTest: string = '';
  currentUserId: number = 0;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private dbService: DbService,
    private nativeStorage: NativeStorage
  ) { }

  async ngOnInit() {
    try {
      const userData = await this.nativeStorage.getItem('usuario');
      this.currentUserId = userData.id;
    } catch (error) {
      console.error('Error loading user data:', error);
      this.router.navigate(['/login']);
    }
  }

  async validar() {
    if (this.oldPassword == this.newPassword) {
      this.presentAlert("Error", "La nueva contraseña no puede ser igual a la anterior.");
      return;
    }

    if (this.newPassword != this.newPasswordTest) {
      this.presentAlert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[\w\W]{8,}$/.test(this.newPassword)) {
      this.presentAlert('Error','La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial');
      return;
    }

    try {
      await this.dbService.cambiarClave(this.currentUserId, this.newPassword);
      this.presentToast("Contraseña actualizada correctamente");
      this.router.navigate(['/perfil']);
    } catch (error) {
      console.error('Error updating password:', error);
      this.presentAlert('Error', 'No se pudo actualizar la contraseña');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
}