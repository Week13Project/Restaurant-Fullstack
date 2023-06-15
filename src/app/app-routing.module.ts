import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';

const routes: Routes = [
  {path: '' , redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', redirectTo: 'home/restaurants'},
  {
    path: 'home', component:MainComponent,
    children: [
      {
        path: 'restaurants',
        component: RestaurantsComponent,
      },
      // {
      //   path: 'menu',
      //   component: MenuComponent,
      // },
      {
        path: ':restaurantid/menu',
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
