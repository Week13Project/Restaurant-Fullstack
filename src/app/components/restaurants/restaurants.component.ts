import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  public restaurants: Restaurant[] = [];
  public disable: Restaurant;
  public routeId: string | null;

  constructor(private restaurantService: RestaurantService, private route:ActivatedRoute){
    const uid = sessionStorage.getItem("userid");
    const routeid = this.route.snapshot.paramMap.get('ownerid');
    this.routeId = this.route.snapshot.paramMap.get('ownerid');
    
    if(this.route.snapshot.routeConfig?.path==":ownerid/r/restaurants"&&routeid!=null){
      this.OwnerRestaurants(routeid);
    } else {
      this.getRestaurants();
    }
  }
  updateRestaurants(){
    this.restaurants=[];
    this.getRestaurants();
  }

  public OwnerRestaurants(id:string): void {
    this.restaurantService.getRestaurantsByOwnerId(id).subscribe({

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
      this.restaurants = [];
      if(this.route.snapshot.routeConfig?.path==":ownerid/r/restaurants"&&this.routeId!=null){
        this.OwnerRestaurants(this.routeId);
      } else {
        this.getRestaurants();
      }
    }
  }
}
