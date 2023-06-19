import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
    @Input() restaurant: Restaurant;
  shown:boolean =true;
  userid:number;
  isOwner:boolean=false;

  constructor(private restaurantService: RestaurantService, public snackBar: MatSnackBar){
    const uid = sessionStorage.getItem("userid");
    if(uid!=null){
      this.userid=parseInt(uid);
    }
  }

  ngOnInit() {
    if(this.restaurant!==undefined){      
      if(this.restaurant.owner==this.userid){
        this.isOwner=true;
      }
    }
  }

  public priceConversion(price: any) : string {
    if(price <= 10) {return "$"}
    if(price <= 25) {return "$$"}
    if(price <= 50) {return "$$$"}
    return "$$$$"
  }

  editRestaurant(name : string, id : number) {
  }

  public deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id);
  }

  public deleteConfirm(name : string, id : number) {
    if(confirm("Are you sure you want to delete " + name))
    {
      this.shown=false;
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: (response) => {
          console.log(response);
          this.openSnackBar(name+" deleted successfully");
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar(name+" deleted failed");
        }
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
      });
  }
}

