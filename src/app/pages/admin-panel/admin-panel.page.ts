import { Component, OnInit } from '@angular/core';

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
    }
  ]
  constructor() { }

  deleteUser(id: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this.users.splice(i, 1);
        break;
      }
    }
  }

  ngOnInit() {
  }

}
