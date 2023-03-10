import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { RegisterComponent } from './register/register.component';
import { MytasklistComponent } from './mytasklist/mytasklist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: HomeComponent,
    pathMatch: 'full' // pathMatch: full gibt an, dass diese route nur aufgerufen wird, danach nichts weiter in der URL folgt
  },
  {
    path: "mytasklist", // steht hinten an der URL
    component: MytasklistComponent // Komponente, die eingebunden wird
  },
  {
    path: "login",
    title: "Login",
    component: LoginComponent
  },
  {
    path: "register",
    title: "Register",
    component: RegisterComponent
  },
  {
    path: "todo",
    component: CreateComponent
  },
  {
    path: "todo/:id",
    component: DetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

