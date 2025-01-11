import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blanerunner',
  templateUrl: './blanerunner.page.html',
  styleUrls: ['./blanerunner.page.scss'],
  standalone: false
})
export class BlanerunnerPage implements OnInit {
  comments = [
    {
      userName: 'Matias Ramirez',
      userPic: '/assets/lego1.jpg',
      date: '2025-01-11',
      content: "Blade Runner 2049 es una película impresionante, con una historia que te hace reflexionar sobre la humanidad y la tecnología. Los efectos visuales son alucinantes. Una secuela que no solo respeta la original, sino que la lleva a otro nivel y la actuación de Ryan Gosling es excelente. me hace decir Soy ese.",
      reactions: '14'
    },
    {
      userName: 'Pepe Torres',
      userPic: '/assets/lego2.jpg',
      date: '2025-01-11',
      content: "la original era mejor",
      reactions: '0',
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}