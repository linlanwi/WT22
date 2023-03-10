import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    const values = this.loginForm.value;
    const username = values.username;
    const password =  values.password;
    console.log('values username', username)
    console.log('values password', password)

    this.auth.loginUser(username!, password!).subscribe({
        next: (response) => {
          console.log('login response',response);
          if(response.status == 201)
          {
            this.auth.getOneUser(username!).subscribe(
              (response) => {
                this.auth.login(response);
                this.router.navigate(['/home'])
              }
            )
          } else {
            console.log('kein Login - Nutzername und/oder Passwort stimmen nicht')
          }
        },
        error: (err) => {
          console.log('login error',err);
        },
        complete: () => console.log('login completed')
      }
    )

  }
}
