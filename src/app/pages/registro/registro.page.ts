import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false

})
export class RegistroPage implements OnInit {
  name: string = '';
  correo: string = '';
  password: string = '';
  passwordTest: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private menuCtrl: MenuController,
  ) {
    this.ionViewWillOpen();
   }

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
    if (this.name == '' || this.correo == '' || this.password == '' || this.passwordTest == '') {
      console.log(this.name, this.correo, this.password, this.passwordTest);
      this.presentAlert('Error','Todos los campos son obligatorios');
      return;
    }

    if (this.name.length < 3) {
      this.presentAlert('Error','El nombre debe tener al menos 3 caracteres');
      return;
    }

    if (!/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(this.correo)) {
      this.presentAlert("Error", "Por favor, ingrese una dirección de correo electrónico válida.");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password)) {
      this.presentAlert('Error','La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial');
      return;
    }

    if (this.password !== this.passwordTest) {
      this.presentAlert('Error','Las contraseñas no coinciden');
      return;
    }

    this.presentToast('Usuario registrado');
    this.router.navigate(['/login']);
  }

  ionViewWillOpen() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }
  
  ngOnInit() {
  }

}
