import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { NavController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-opciones-perfil',
  templateUrl: './opciones-perfil.page.html',
  styleUrls: ['./opciones-perfil.page.scss'],
  standalone: false,
  providers: [Camera, SQLite] // Inyectamos el servicio de SQLite
})
export class OpcionesPerfilPage implements OnInit {
  imagenPerfil: string | null = null;

  constructor(private camera: Camera, private navCtrl: NavController, private sqlite: SQLite) {}

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
      this.guardarFotoEnBaseDeDatos(imagenData); // Guardar la foto en SQLite
      this.navCtrl.back(); // Regresar a la página anterior después de tomar la foto
      window.location.reload(); // Recargar para reflejar el cambio

    }, (err) => {
      console.log('Error al tomar la foto:', err);
    });
  }

  // Función para guardar la foto en la base de datos
  guardarFotoEnBaseDeDatos(imagenData: string) {
    this.sqlite.create({
      name: 'miBaseDeDatos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // Supongo que tienes un identificador de usuario guardado
      let userId = 1;  // Cambiar por el ID real del usuario

      db.executeSql('UPDATE usuario SET foto = ? WHERE id = ?', [imagenData, userId])
        .then(() => {
          console.log('Foto guardada correctamente');
        })
        .catch((error) => {
          console.log('Error al guardar la foto:', error);
        });
    }).catch((error) => {
      console.log('Error al abrir la base de datos:', error);
    });
  }
}
