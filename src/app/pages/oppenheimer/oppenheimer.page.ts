import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Share } from '@capacitor/share'; 

@Component({
  selector: 'app-oppenheimer',
  templateUrl: './oppenheimer.page.html',
  styleUrls: ['./oppenheimer.page.scss'],
  standalone: false,
})
export class OppenheimerPage implements OnInit {
  userRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  ratings: number[] = [4, 5, 3, 5, 4]; // Ejemplo de calificaciones de otros usuarios
  averageRating: number = 0;

  newComment: string = '';
  errorMessage: string = '';

  user: string = '';
  comments = [
    {
      id: '1',
      userName: 'Matias Ramirez',
      userPic: '/assets/lego1.jpg',
      date: '2024-12-25',
      content: "Oppenheimer es una película intensa y fascinante. La historia es atrapante, con un gran ritmo y actuaciones increíbles, especialmente de Cillian Murphy. Aunque es larga, nunca se siente aburrida. La música y la cinematografía hacen que todo se sienta aún más épico. Sin duda, una de las mejores películas del año.",
      reactions: '14'
    },
    {
      id: '2',
      userName: 'Pepe Torres',
      userPic: '/assets/lego2.jpg',
      date: '2025-01-11',
      content: "jaja la bomba nuclear creada para destruir y crear caos hiso exactamente eso.  oppenhaimer: nooo 😭😭",
      reactions: '0',
    }
  ];

  sitios: any;
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiRest: ApiRestService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    });

    this.apiRest.obtenerSitios("872585").subscribe({
      next: (data) => {
        this.sitios = data;
        console.log('Sitios data:', JSON.stringify(this.sitios));
      },
      error: (error) => {
        console.error('API Error:', error);
        this.presentAlert('Error', 'No se pudieron obtener los sitios.');
      }
    });
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

  banPost(id: any) {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id == id) {
        this.comments.splice(i, 1);
      }
    }

    this.presentToast("Publicación eliminada");
  }

  validateComment() {
    if (!this.newComment.trim()) {
      this.errorMessage = 'El comentario no puede estar vacío.';
    } else if (this.newComment.length < 5) {
      this.errorMessage = 'El comentario debe tener al menos 5 caracteres.';
    } else {
      this.errorMessage = '';
    }
  }

  sendComment() {
    this.validateComment();
    if (this.errorMessage) return;

    console.log('Comentario enviado:', this.newComment);
    this.newComment = '';
  }

  rateMovie(rating: number) {
    this.userRating = rating;
    this.ratings.push(rating);
    this.calculateAverageRating();
  }

  calculateAverageRating() {
    const total = this.ratings.reduce((sum, rate) => sum + rate, 0);
    this.averageRating = this.ratings.length ? total / this.ratings.length : 0;
  }

  // Nueva función para compartir la película
  async shareMovie() {
    try {
      await Share.share({
        title: 'Oppenheimer',
        text: 'Te recomiendo ver Oppenheimer y toda su info en CineForum, una película fascinante con una historia atrapante.',
        dialogTitle: 'Compartir película'
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  }

  ngOnInit() {}
}
