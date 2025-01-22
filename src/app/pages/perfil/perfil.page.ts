import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  imagenPerfil: string | null = null;

  posts = [
    {
      title: "Post 1",
      content: "Pudo haber sido mejor."
    },
    {
      title: "Post 2",
      content: "No me gustó."
    },
    {
      title: "Post 3",
      content: "Me encantó."
    }
  ];

  constructor(private cd: ChangeDetectorRef, private sqlite: SQLite) {}

  ngOnInit() {
    this.cargarFotoPerfil(); 
  }

  ionViewWillEnter() {
    this.cargarFotoPerfil(); 
    this.cd.detectChanges();
  }

  cargarFotoPerfil() {
    this.sqlite.create({
      name: 'miBaseDeDatos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // Supongo que tienes un identificador de usuario guardado
      let userId = 1;  // Cambiar por el ID real del usuario

      db.executeSql('SELECT foto FROM usuario WHERE id = ?', [userId])
        .then((res) => {
          if (res.rows.length > 0) {
            this.imagenPerfil = res.rows.item(0).foto;
          } else {
            console.log('No se encontró la foto');
          }
        })
        .catch((error) => {
          console.log('Error al cargar la foto:', error);
        });
    }).catch((error) => {
      console.log('Error al abrir la base de datos:', error);
    });
  }

  logout() {
    // Aquí va la lógica de logout
  }
}

