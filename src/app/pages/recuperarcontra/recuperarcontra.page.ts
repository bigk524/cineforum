import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
  standalone: false
})
export class RecuperarcontraPage implements OnInit {
  email: string = '';

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

  enviar() {
    if (this.email == '') {
      this.presentAlert("Error", "Por favor, ingrese su correo electrónico.");
      return;
    }

    this.presentToast("Correo enviado!");
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}