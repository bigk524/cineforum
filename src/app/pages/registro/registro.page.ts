import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
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

  // Variables para errores
  errorName: string = '';
  errorCorreo: string = '';
  errorPassword: string = '';
  errorPasswordTest: string = '';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private menuCtrl: MenuController,
    private dbService: DbService
  ) {
    this.ionViewWillOpen();
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
    // Reiniciar errores
    this.errorName = '';
    this.errorCorreo = '';
    this.errorPassword = '';
    this.errorPasswordTest = '';

    // Validaciones básicas
    if (!this.name) {
      this.errorName = 'El nombre es obligatorio';
    } else if (this.name.length < 3) {
      this.errorName = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!this.correo) {
      this.errorCorreo = 'El correo es obligatorio';
    } else if (!/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo)) {
      this.errorCorreo = 'Correo electrónico no válido';
    }

    if (!this.password) {
      this.errorPassword = 'La contraseña es obligatoria';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]{8,}$/.test(this.password)) {
      this.errorPassword = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
    }

    if (!this.passwordTest) {
      this.errorPasswordTest = 'Debe confirmar su contraseña';
    } else if (this.password !== this.passwordTest) {
      this.errorPasswordTest = 'Las contraseñas no coinciden';
    }

    // Si hay errores, no continuar
    if (this.errorName || this.errorCorreo || this.errorPassword || this.errorPasswordTest) {
      return;
    }

    // Crear objeto usuario y registrar
    const usuario: Usuario = {
      id: -1, // oops!
      nombre: this.name,
      email: this.correo,
      clave: this.password,
      descripcion: '',
      rol: 2,
      foto: null
    };

    await this.dbService.registarUsuario(usuario)
      .then(_ => {
        this.presentToast('Usuario registrado');
        this.router.navigate(['/login']);
      })
      .catch(e => {
        if (e.emailDuplicado) {
          this.errorCorreo = 'Ya existe una cuenta registrada con ese correo.';
        }
        if (e.nombreDuplicado) {
          this.errorName = 'Ya existe una cuenta con ese nombre.';
        }
      });
  }

  ionViewWillOpen() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  ngOnInit() { }
}
