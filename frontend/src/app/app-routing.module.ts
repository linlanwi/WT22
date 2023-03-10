import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { RegisterComponent } from './register/register.component';
import { MytasklistComponent } from './mytasklist/mytasklist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { AdminguardGuard } from './shared/adminguard.guard';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: HomeComponent,
    pathMatch: 'full',// pathMatch: full gibt an, dass diese route nur aufgerufen wird, danach nichts weiter in der URL folgt

  },
  { path: 'home',   redirectTo: 'mytasklist'},
  {
    path: "mytasklist", // steht hinten an der URL
    component: MytasklistComponent, // Komponente, die eingebunden wird
    canActivate: [AuthguardGuard]
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
  },
  {
    path: "userlist",
    title: "All Users",
    component: UserlistComponent,
    canActivate: [AdminguardGuard]
  },
  { path: 'userlist',   redirectTo: '/home'}
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

