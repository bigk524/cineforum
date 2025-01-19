import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-opciones-perfil',
  templateUrl: './opciones-perfil.page.html',
  styleUrls: ['./opciones-perfil.page.scss'],
  standalone: false,
  providers: [Camera] // Inyectamos el servicio de la cámara
})
export class OpcionesPerfilPage implements OnInit {
  imagenPerfil: string | null = null;

  constructor(private camera: Camera, private navCtrl: NavController) {}

  ngOnInit() {}

  tomarFoto() {
    const opciones: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
    };

    this.camera.getPicture(opciones).then((imagenData) => {
      this.imagenPerfil = 'data:image/jpeg;base64,' + imagenData;
      localStorage.setItem('fotoPerfil', this.imagenPerfil); // Guardar la imagen en localStorage
      this.navCtrl.back(); // Regresar a la página anterior después de tomar la foto
      window.location.reload();

    }, (err) => {
      console.log('Error al tomar la foto:', err);
    });
  }
}



