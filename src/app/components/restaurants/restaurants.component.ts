import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  public restaurants: Restaurant[] = [];
  public disable: Restaurant;

  constructor(private restaurantService: RestaurantService){
    this.getRestaurants();
  }

  ngOnInit(): void {
  /*  this.restaurants = 
    [
      {
        "name" : "restaurant1",
        "price" : 20
      },
      {
        "name" : "restaurant2",
        "price" : 30
      },
      {
        "name" : "restaurant3",
        "price" : 40
      },
      {
        "name" : "restaurant4",
        "price" : 50
      },
      {
        "name" : "restaurant5",
        "price" : 15
      },
      {
        "name" : "restaurant6",
        "price" : 10
      }
    ] */
    // this.getRestaurants();
  }

  public priceConversion(price: any) : string {
    if(price <= 10) {return "$"}
    if(price <= 25) {return "$$"}
    if(price <= 50) {return "$$$"}
    return "$$$$"
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

  public deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id);
  }

  public deleteConfirm(name : string, id : number) {
    if(confirm("Are you sure you want to delete " + name))
    {
      this.restaurantService.deleteRestaurant(id);
    }
  }
}
