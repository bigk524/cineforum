import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.page.html',
  styleUrls: ['./tendencias.page.scss'],
  standalone: false
})
export class TendenciasPage implements OnInit {
  peliculasEnTendencia: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.peliculasEnTendencia = [
      {
        id: 1,
        titulo: "Oppenheimer",
        comentarios: 320,
        calificacion: 4.8,
        imagen: "/assets/images.jpg"
      },
      {
        id: 2,
        titulo: "Spider-Man: Across the Spider-Verse",
        comentarios: 290,
        calificacion: 4.9,
        imagen: "/assets/Across-the-Spider-Verse-2023.jpg"
      },
      {
        id: 3,
        titulo: "Barbie",
        comentarios: 280,
        calificacion: 4.7,
        imagen: "/assets/maxresdefault.jpg"
      }
    ];
  }
}