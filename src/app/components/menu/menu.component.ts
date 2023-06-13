import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  arr!:number[];
  
  constructor() {
    this.arr = Array(10);
  }

}
