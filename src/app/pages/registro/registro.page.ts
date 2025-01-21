import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Usuario } from 'src/app/services/usuario';

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
    private dbService: DbService,
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

  async validar() {
    if (this.name == '' || this.correo == '' || this.password == '' || this.passwordTest == '') {
      console.log(this.name, this.correo, this.password, this.passwordTest);
      this.presentAlert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (this.name.length < 3) {
      this.presentAlert('Error', 'El nombre debe tener al menos 3 caracteres');
      return;
    }

    if (!/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(this.correo)) {
      this.presentAlert("Error", "Por favor, ingrese una dirección de correo electrónico válida.");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]{8,}$/.test(this.password)) {
      this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial');
      return;
    }

    if (this.password !== this.passwordTest) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const usuario: Usuario = {
      nombre: this.name,
      email: this.correo,
      clave: this.password,
      descripcion: '',
      banneado: false,
      rol: 2,
      foto: null
    };

    await this.dbService.registarUsuario(usuario)
    .then(_ => {
      this.presentToast('Usuario registrado');
      this.router.navigate(['/login']);
    }).catch(e => {
      const mensajeEmail = "Ya existe una cuenta registrada con ese correo.";
      const mensajeNombre = "Ya existe una cuenta con ese nombre.";
      if (e.emailDuplicado && e.nombreDuplicado) {
        this.presentAlert("Error en el registro", `${mensajeEmail}\n${mensajeNombre}`);
      } else if (e.emailDuplicado) {
        this.presentAlert("Error en el registro", mensajeEmail);
      } else {
        this.presentAlert("Error en el registro", mensajeNombre);
      }
    })
  }

  ionViewWillOpen() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  ngOnInit() {
  }

}
