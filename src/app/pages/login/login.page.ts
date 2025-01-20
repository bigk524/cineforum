import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { UserService } from 'src/app/services/user.service';

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
    private router: Router,
    private menuCtrl: MenuController,
    private db: DbService,
    private userService: UserService,
    private nativeStorage: NativeStorage
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

  async login() {
    const user = await this.db.buscarUsuario(this.user, this.password);
    if (user) {
      console.log('Login exitoso:', user);
      this.presentToast('Bienvenido!');
      await this.userService.login(user);

      const navigationExtras: NavigationExtras = {
        state: {
          user: user,
        }
      };
      
      this.nativeStorage.setItem('rol', user.rol == 1 ? 'admin' : 'usuario');
      this.router.navigate(['/home'], navigationExtras);
    } else {
      console.log('Login falló');
      this.presentAlert('Error', 'Usuario o contraseña incorrecta');
    }
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

  ionViewWillOpen() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }
  
  ngOnInit() {
  }

}
