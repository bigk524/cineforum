import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
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
    if (this.user == 'admin' && this.password == 'admin') {
      this.presentAlert("Bienvenido", "Bienvenido, Admin!");
    } else if (this.user == 'admin' && this.password != 'admin') {
      this.presentAlert("Error", "Contraseña incorrecta.");
      return;
    } else if (this.user == '' && this.password == '') {
      this.presentAlert("Error", "Por favor, ingrese su usuario y contraseña.");
      return;
    } else {
      this.presentToast("Bienvenido!");
    }
    let navigationExtras = {
      state: {
        user: this.user
      }
    };

    this.router.navigate(['/home'], navigationExtras);
  }

  ngOnInit() {
  }

}
