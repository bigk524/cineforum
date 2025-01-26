import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Pelicula } from 'src/app/services/pelicula';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
  standalone: false,
})
export class CrearPublicacionPage {
  newMovie: Pelicula = {
    id: 0,
    titulo: '',
    genero: '',
    duracion: 0,
    clasificacion: '',
    sinopsis: '',
    director: '',
    estreno: new Date().toISOString(),
    portada: 'assets/rollo.jpg'
  };
  
  constructor(
    private dbService: DbService,
    private router: Router,
    private alertController: AlertController,
    private camera: Camera,
  ) {}

  async crearPublicacion() {
    if (this.validateForm()) {
      try {
        await this.dbService.addPelicula(this.newMovie);
        this.presentAlert('Éxito', 'Película agregada correctamente');
        this.router.navigate(['/home']);
      } catch (error) {
        this.presentAlert('Error', 'No se pudo agregar la película');
      }
    }
  }

  validateForm(): boolean {
    if (!this.newMovie.titulo) {
      this.presentAlert('Error', 'El título es requerido');
      return false;
    }
    if (!this.newMovie.sinopsis) {
      this.presentAlert('Error', 'La sinopsis es requerida');
      return false;
    }
    if (!this.newMovie.director) {
      this.presentAlert('Error', 'El director es requerido');
      return false;
    }
    return true;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newMovie.portada = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 90,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.MediaType.PICTURE,
      allowEdit: false,
    }).then(imageData => {
      this.newMovie.portada = imageData;
    })
  }
}