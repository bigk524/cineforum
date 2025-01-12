import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-oppenheimer',
  templateUrl: './oppenheimer.page.html',
  styleUrls: ['./oppenheimer.page.scss'],
  standalone: false,
})
export class OppenheimerPage implements OnInit {

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
  constructor(
     private alertController: AlertController,
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
    
      ngOnInit() {
      }
    
    }
    
