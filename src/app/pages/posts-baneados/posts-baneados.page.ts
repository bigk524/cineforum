import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-baneados',
  templateUrl: './posts-baneados.page.html',
  styleUrls: ['./posts-baneados.page.scss'],
  standalone: false,
})
export class PostsBaneadosPage implements OnInit {
  posts = [
    {
      title: 'Post 4',
      content: 'asdfgetgegergasa',
      reason: 'Spam',
    },
    {
      title: 'Post 5',
      content: 'askkdlffal',
      reason: 'Spam',
    },
    {
      title: 'Post 6',
      content: 'asjdafkjalhdfdk',
      reason: 'Spam',
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
