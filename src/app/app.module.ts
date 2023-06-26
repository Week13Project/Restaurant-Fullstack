import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UsersapiService } from './services/usersapi.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AdditemComponent } from './components/additem/additem.component';
import { RestaurantComponent } from './components/restaurants/restaurant/restaurant.component';
import { AddrestaurantComponent } from './components/addrestaurant/addrestaurant.component';
import { RestaurantService } from './services/restaurant.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    NavComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    RestaurantsComponent,
    AdditemComponent,
    RestaurantComponent,
    AddrestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [UsersapiService,RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
