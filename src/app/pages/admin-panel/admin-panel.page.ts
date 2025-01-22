import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
  standalone: false,
})
export class AdminPanelPage implements OnInit {
  users = [
    {
      name: 'Matias Ramirez',
      id: '1',
    },
    {
      name: 'Pepe Torres',
      id: '2',
    },
    {
      name: 'Juan Perez',
      id: '3',
    },
    {
      name: 'Ana Lopez',
      id: '4',
    },
  ];

  private dbInstance: SQLiteObject | undefined;

  constructor(private alertController: AlertController, private toastController: ToastController, private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      const db = await this.sqlite.create({
        name: 'cineforum.db',
        location: 'default',
      });
      this.dbInstance = db;
      if (this.dbInstance) {
        await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS banneo (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_usuario INTEGER,
          fecha DATE,
          razon TEXT,
          FOREIGN KEY (id_usuario) REFERENCES usuario (id)
        );`,
        );
      }
      ;
      console.log('Tabla banneo creada o ya existe');
    } catch (error) {
      console.error('Error inicializando la base de datos:', error);
    }
  }

  async banUser(id: string, name: string) {
    const alert = await this.alertController.create({
      header: 'Bannear Usuario',
      inputs: [
        {
          name: 'razon',
          type: 'text',
          placeholder: 'Razón del baneo',
        },
        {
          name: 'fecha',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Banear',
          handler: async (data) => {
            if (data.razon && data.fecha) {
              await this.registerBan(id, data.fecha, data.razon);
              this.deleteUser(id);
              this.showToast(`Usuario ${name} ha sido baneado correctamente.`);
              console.log(`Usuario ${name} baneado.`);
            } else {
              console.error('Razón y fecha son requeridas.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async registerBan(id: string, fecha: string, razon: string) {
    try {
      if (this.dbInstance) {
        await this.dbInstance.executeSql(
          'INSERT INTO banneo (id_usuario, fecha, razon) VALUES (?, ?, ?)',
          [id, fecha, razon]
        );
      } else {
        console.error('Database instance is not initialized.');
      }
      console.log('Baneo registrado en la base de datos.');
    } catch (error) {
      console.error('Error al registrar el baneo:', error);
    }
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  ngOnInit() {}
}
