import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  user: string = '';
  password: string = '';
  
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
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

  validarCampos() {
    if (this.user == 'José' && this.password == '123') {
      this.presentAlert("Bienvenido", "Bienvenido, José!.");
    } else {
      this.presentToast("Credenciales inválidas");
    }
  }

  limpiarCampos() {
    this.user = '';
    this.password = '';
  }

  ngOnInit() {
  }

}
