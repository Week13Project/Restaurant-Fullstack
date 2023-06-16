import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { Menulist } from 'src/app/model/menulist';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu:Menulist;
  index:number;
  routeid:string|null;
  categories:string[];
 
  constructor(private service: RestaurantService, private route:ActivatedRoute){
    this.menu= new Menulist();
    this.routeid = this.route.snapshot.paramMap.get('restaurantid');
    this.getMenu(this.routeid);
  }

  public getMenu(id:string|null): void {
    this.service.getMenuByRestaurantId(id).subscribe({
      next: (response: MenuItem[]) => {
        console.log(response);
        this.subMenus(response);
        // this.menu= response;
      },
      //error: (e) => alert(e.message),
      // complete: () => console.log(this.menu)
    });
  }
  
  ngOnInit(){
    console.log(this.menu);
  } 
  orderOriginal: ((a: KeyValue<string,MenuItem[]>,b: KeyValue<string,MenuItem[]>) => number)|undefined;
 

  subMenus(menu:MenuItem[]){
    // this.menu= menu;
    console.log(this.menu.list);
    var obj:any = this.menu;
    this.categories=this.menu.categories;
    
    Object.keys(obj.list).forEach(key => {
      console.log(obj.categories[key], obj.list[key]);
      menu.forEach( (i) => {
        if(i.category===obj.categories[key].toLowerCase()){
          obj.list[key].push(i);
        }
        if(obj.categories[key].toLowerCase()==="other"&&!obj.categories.includes(i.category)){
          obj.list[key].push(i);
        }
      });
      console.log(obj.categories[key], obj.list[key]);
    });
    // this.categories.forEach(c => {
    //   c=c.toLowerCase();
    //   console.log(c);
    //   menu.forEach( (i) => {
    //     var ref:MenuItem[] = eval("this.menu."+c);
    //     if(i.category===c){
    //       // console.log(i.category);
    //       // this.appetizers.push(i);
    //       ref.push(i);
    //     }
    //     if(c==="other"&&!this.categories.includes(i.category)){
    //       ref.push(i);
    //     }
    //     // console.log(ref);
    //     // console.log(eval("this."+c));
    //   });
    // }); 
    console.log(this.menu);
    
  }

}
