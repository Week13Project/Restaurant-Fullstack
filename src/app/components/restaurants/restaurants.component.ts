import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  public restaurants: Restaurant[] = [];
  public disable: Restaurant;

  constructor(private restaurantService: RestaurantService){
    this.getRestaurants();
  }

  public getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({

      next: (response: Restaurant[]) => {
        console.log(response);
        for(const restaurant of response)
        {
          if(restaurant.disabled == false)
          {
            this.restaurants.push(restaurant)
          }
        }
      },
      error: (e) => alert(e.message)
    })
  }

  public searchRestaurants(search: string): void {
    const searchResult: Restaurant[] = [];
    for(const restaurant of this.restaurants) {
      if(restaurant.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      {
        searchResult.push(restaurant);
      }
    }
    this.restaurants = searchResult;
    if(searchResult.length == 0 || !search)
    {
      this.getRestaurants();
    }
  }
}
