import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { Menulist } from 'src/app/model/menulist';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurant:Restaurant;
  menu:Menulist;
  index:number;
  routeid:string|null;
  categories:string[];
  isOwner:boolean = false;
  userid:number;
 
  constructor(private service: RestaurantService, private route:ActivatedRoute){
    this.menu= new Menulist();
    this.routeid = this.route.snapshot.paramMap.get('restaurantid');
    this.getMenu(this.routeid);
    this.getRestaurant(this.routeid);
    const uid = sessionStorage.getItem("userid");
    if(uid!=null){
      this.userid=parseInt(uid);
    }
  }
  
  public getRestaurant(id:string|null): void {
    this.service.getRestaurantById(id).subscribe({
      next: (response: Restaurant) => {
        console.log(response);
        if(response.owner==this.userid){
          this.isOwner=true;
        }
      },
    });
  }
  public getMenu(id:string|null): void {
    this.service.getMenuByRestaurantId(id).subscribe({
      next: (response: MenuItem[]) => {
        this.subMenus(response);
      },
    });
  }
  
  ngOnInit(){
  } 
  orderOriginal: ((a: KeyValue<string,MenuItem[]>,b: KeyValue<string,MenuItem[]>) => number)|undefined;

  subMenus(menu:MenuItem[]){
    var obj:any = this.menu;
    this.categories=this.menu.categories;
    
    Object.keys(obj.list).forEach(key => {
      menu.forEach( (i) => {
        if(i.category===obj.categories[key].toLowerCase()){
          obj.list[key].push(i);
        }
        
        var otherregex = new RegExp( obj.categories.join( "|" ), "i");

        if(obj.categories[key].toLowerCase()==="other"&&!otherregex.test(i.category)){
          obj.list[key].push(i);
        }
      });
    });
  }

}
