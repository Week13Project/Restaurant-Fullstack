import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() item:MenuItem;
  @Input() index:number;

  ngOnInit(){
    if(this.item.path===undefined){
      this.item.path="assets/img/food/hamburger.jpg";
    }
  } 

}
