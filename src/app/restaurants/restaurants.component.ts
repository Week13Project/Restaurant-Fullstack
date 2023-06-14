import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  public restaurants: Restaurant[];

  ngOnInit(): void {
    this.restaurants = 
    [
      {
        "name" : "restaurant1",
        "price" : "$$$$"
      },
      {
        "name" : "restaurant2",
        "price" : "$$$"
      },
      {
        "name" : "restaurant3",
        "price" : "$$$$"
      },
      {
        "name" : "restaurant4",
        "price" : "$"
      },
      {
        "name" : "restaurant5",
        "price" : "$$$"
      },
      {
        "name" : "restaurant6",
        "price" : "$$"
      }
    ]
    console.log(this.restaurants)
  }

}
