import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'email', 'role'];

  constructor(private auth: AuthService) {

  }
  ngOnInit(): void {
    this.auth.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log('this.users', this.users)
      }
    })
  }
}

