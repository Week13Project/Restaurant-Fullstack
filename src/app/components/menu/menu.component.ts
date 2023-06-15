import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menu:MenuItem[];
  index:number;

  constructor(private service: RestaurantService, private route:ActivatedRoute){
    const routeid = this.route.snapshot.paramMap.get('restaurantid');
      this.getMenu(routeid);
  }

  public getMenu(id:string|null): void {
    this.service.getMenuByRestaurantId(id).subscribe({
      next: (response: MenuItem[]) => {
        console.log(response);
        this.menu=response;
      },
      //error: (e) => alert(e.message),
      complete: () => console.log(this.menu)
    })
  }

}
