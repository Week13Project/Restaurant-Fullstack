import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() item:MenuItem;
  @Input() index:number;
  @Input() admin:boolean;

  constructor(private router: Router,private route: ActivatedRoute){}

  ngOnInit(){
    if(this.route.snapshot.routeConfig?.path!=":restaurantid/menu"){
      console.log(this.route.snapshot.routeConfig?.path);
      this.admin = false;
    }
    
    if(this.item.path===undefined){
      this.item.path="assets/img/food/hamburger.jpg";
    }
  } 
  editItem(){
    const restaurantid = this.route.snapshot.paramMap.get('restaurantid');
    this.router.navigate(["/home/"+restaurantid+"/"+this.item.itemId+"/edit"]);
  }
  deleteItem(){

  }

}
