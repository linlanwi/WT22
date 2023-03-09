import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from '../shared/todo';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  todos!: Todo[];
  form!: FormGroup;

  constructor(private bs: BackendService, private router: Router,private location: Location) {

  }

  createOne(): void {
    const values = this.form.value;
    const todo: Todo = {
      aufgabe: values.aufgabeControl!,
      beschreibung: values.beschreibungControl!,
      frist: values.fristControl!,
      _id: ''
    };
    this.bs.createOne(todo)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log(response._id);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.log('createOne() completed')
      });
    this.router.navigateByUrl('/mytasklist');
  }

  cancel(): void {
    this.location.back();
  }
}
