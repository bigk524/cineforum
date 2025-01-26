import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { DbService } from '../services/db.service';
import { Pelicula } from '../services/pelicula';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  role: string = '';
  searchTerm: string = '';
  peliculas!: Pelicula[];
  private suscripcionPeliculas?: Subscription;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menuCtrl: MenuController,
    private nativeStorage: NativeStorage,
    private dbService: DbService,
  ) {}

  ionViewWillOpen() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(true);
  }

  ngOnInit() {
    this.ionViewWillOpen();
    this.nativeStorage.getItem('rol').then(result => {
      this.role = result;
    }); 
  }

  async ionViewWillEnter() {
    this.dbService.fetchPeliculas().subscribe(result => {
      this.peliculas = result;
    });
  }

  ngOnDestroy() {
    if (this.suscripcionPeliculas) {
      this.suscripcionPeliculas.unsubscribe();
    }
  }

 /*
  async searchMovies(term: string) {
    if (!term) {
      this.peliculas = [...this.dbService.movieCache];
      return;
    }

    this.peliculas = this.peliculas.filter(movie => 
      movie.titulo.toLowerCase().includes(term.toLowerCase())
    );
  }

  trackById(_index: number, pelicula: Pelicula): number {
    return pelicula.id;
  }
*/
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}