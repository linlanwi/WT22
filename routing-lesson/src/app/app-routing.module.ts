import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'first', component: FirstComponent},
  { path: 'first/:id', component: FirstComponent},
  { path: 'second', component: SecondComponent}
]; // Array enthält Pfadangaben zu den Komponenten

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// diese Klasse ist ein eignes Angular Modul
// Routen sind Objekte wie folgt notiert: { path: 'mypath', component: MyComponent }
// Pfad http://www.mydomain.de/mypath -> die Komponente MyComponent wird aufgerufen