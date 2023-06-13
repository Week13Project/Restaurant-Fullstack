import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '' , redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'home', component:MainComponent,
    children: [
      {
        path: ':restaurantid',
        component: MenuComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
