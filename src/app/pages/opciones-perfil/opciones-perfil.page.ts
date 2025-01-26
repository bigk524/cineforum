import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { NavController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-opciones-perfil',
  templateUrl: './opciones-perfil.page.html',
  styleUrls: ['./opciones-perfil.page.scss'],
  standalone: false,
  providers: [Camera, SQLite], // Inyectamos el servicio de SQLite
})
export class OpcionesPerfilPage implements OnInit {
  imagenPerfil: string | null = null;
  userId: number = 2; // Reemplaza esto con el ID dinámico del usuario

  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    private sqlite: SQLite
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




  // Función para tomar una foto
  tomarFoto() {
    const opciones: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
    };

    this.camera.getPicture(opciones).then(
      (imagenData) => {
        const imagenBase64 = 'data:image/jpeg;base64,' + imagenData;
        this.imagenPerfil = imagenBase64; // Mostrar la foto en la página
        this.guardarFotoEnBaseDeDatos(imagenData); // Guardar en la base de datos
      },
      (err) => {
        console.log('Error al tomar la foto:', err);
      }
    );
  }

  // Guardar la foto en SQLite
  guardarFotoEnBaseDeDatos(imagenData: string) {
    const blobFoto = this.base64ToBlob(imagenData); // Convertir Base64 a BLOB

    this.sqlite
      .create({
        name: 'cineforum.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE usuario SET foto = ? WHERE id = ?', [
          blobFoto,
          this.userId,
        ])
          .then(() => {
            console.log('Foto guardada correctamente');
          })
          .catch((error) => {
            console.log('Error al guardar la foto:', error);
          });
      })
      .catch((error) => {
        console.log('Error al abrir la base de datos:', error);
      });
  }

  // Convertir Base64 a BLOB
  base64ToBlob(base64Data: string): Uint8Array {
    const byteString = atob(base64Data);
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }
    return arrayBuffer;
  }

  // Convertir un BLOB a Base64
  blobToBase64(blob: any): string {
    let binary = '';
    const bytes = new Uint8Array(blob);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpeg;base64,' + btoa(binary);
  }
}
