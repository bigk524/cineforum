import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-opciones-seguridad',
  templateUrl: './opciones-seguridad.page.html',
  styleUrls: ['./opciones-seguridad.page.scss'],
  standalone: false,
})
export class OpcionesSeguridadPage implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  newPasswordTest: string = '';

  constructor(
      private alertController: AlertController,
      private toastController: ToastController,
      private router: Router,
  ) { }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
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

  validar() {
    if (this.oldPassword == this.newPassword) {
      this.presentAlert("Error", "La nueva contraseña no puede ser igual a la anterior.");
      return;
    }

    if (this.newPassword != this.newPasswordTest) {
      this.presentAlert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.newPassword)) {
      this.presentAlert('Error','La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial');
      return;
    }

    this.presentToast("Contraseña actualizada");

  }
  ngOnInit() {
  }

}
