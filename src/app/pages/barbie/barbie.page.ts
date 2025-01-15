import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-barbie',
  templateUrl: './barbie.page.html',
  styleUrls: ['./barbie.page.scss'],
  standalone: false,
})
export class BarbiePage implements OnInit {
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
      date: '2025-01-10',
      content: "Barbie es una película divertida, creativa y sorprendentemente profunda. La combinación de humor y mensaje hace que sea entretenida para todos. Margot Robbie brilla en el papel principal, pero Ryan Gosling se roba muchas escenas como Ken, con una actuación increíblemente carismática y divertida. La estética es espectacular y la música encaja perfecto.",
      reactions: '12'
    },
    {
      id: '2',
      userName: 'Pepe Torres',
      userPic: '/assets/lego2.jpg',
      date: '2025-01-11',
      content: "quiero una mojo dojo casa house XD",
      reactions: '0',
    }
  ];
  constructor(private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    })
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
    if (this.errorMessage) return; // Evita enviar si hay error

    // Aquí iría la lógica para enviar el comentario
    console.log('Comentario enviado:', this.newComment);
    this.newComment = ''; // Limpiar el campo después de enviar
  }
  // ⭐ Nueva función para calificar la película
  rateMovie(rating: number) {
    this.userRating = rating;
    this.ratings.push(rating);
    this.calculateAverageRating();
  }

  // ⭐ Cálculo del promedio de calificación
  calculateAverageRating() {
    const total = this.ratings.reduce((sum, rate) => sum + rate, 0);
    this.averageRating = this.ratings.length ? total / this.ratings.length : 0;
  }

  ngOnInit() { }
}




