import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Usuario } from 'src/app/services/usuario';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-opciones-perfil',
  templateUrl: './opciones-perfil.page.html',
  styleUrls: ['./opciones-perfil.page.scss'],
  standalone: false
})
export class OpcionesPerfilPage implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    clave: '',
    descripcion: '',
    rol: 0,
    foto: null
  };
  imagenPerfil: string | undefined;

  constructor(
    private dbService: DbService,
    private alertController: AlertController,
    private toastController: ToastController,
    private nativeStorage: NativeStorage
  ) { }

  async ngOnInit() {
    try {
      const userData = await this.nativeStorage.getItem('usuario');
      const userFromDb = await this.dbService.getUserById(userData.id);
      this.usuario = userFromDb;
      this.imagenPerfil = this.usuario.foto as string;
    } catch (error) {
      console.error('Error loading user data:', error);
      this.presentAlert('Error', 'No se pudo cargar la información del usuario');
    }
  }

  async actualizarPerfil() {
    try {
      await this.dbService.updateUser(this.usuario);
      await this.nativeStorage.setItem('usuario', this.usuario);
      this.presentToast('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      this.presentAlert('Error', error instanceof Error ? error.message : 'Error al actualizar el perfil');
    }
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      this.imagenPerfil = image.dataUrl;
      this.usuario.foto = image.dataUrl;
    } catch (error) {
      console.error('Error taking photo:', error);
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}