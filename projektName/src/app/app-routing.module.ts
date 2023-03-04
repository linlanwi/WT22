import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cities",
    component: CitiesComponent
  }
];
// pathMatch gibt an, dass diese Route nur aufgerufen wird, wenn danach nichts weiter in der URL folgt

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }


// hier erfolgt die Routendefinition
