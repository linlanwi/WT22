import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  todos!: Todo[];
  constructor(private bs: BackendService) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
      {
        next: (response) => {
          this.todos = response;
          console.log(this.todos);
          return this.todos;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }
  delete(id: string): void {
    console.log("id :" ,id );
  }
}
