import { RegisterComponent } from './register/register.component';
import { MytasklistComponent } from './mytasklist/mytasklist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Angular-Projekt besteht aus einer oder mehreren Modulen, die jeweils eine Gruppe von Komponenten, Direktiven, Pipes und Services enthalten
// -> NgModule-Modul bietet eine Möglichkeit diese Module zu definieren, zu importieren und zu exportieren, um die Funktionalität der Anwendung zu organisieren und zu erweitern.
// RouterModule-Modul und das Routes-Interface: ersteres für Anwendung zu routen und die Navigation innerhalb der Anwendung zu steuern
// zweiteres: routen definieren

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: "mytasklist", // steht hinten an der URL
    component: MytasklistComponent // Komponente, die eingebunden wird
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];
// pathMatch: full gibt an, dass diese route nur aufgerufen wird, danach nichts weiter in der URL folgt
// pathMatch gibt an, dass die Route passen muss, aber nicht nur ein Präfix einer längeren Route sein darf

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

// Der Code definiert ein benutzerdefiniertes AppRoutingModule-Modul, das verwendet wird, um die Routing-Logik einer Angular-Anwendung zu organisieren und zu konfigurieren.
