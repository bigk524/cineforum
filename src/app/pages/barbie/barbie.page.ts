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
        
          ngOnInit() {
          }
        
        }
  
  
