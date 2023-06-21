import { MenuItem } from "./menu-item";

export class Menulist {
    
  list:object;
  categories:string[];

  constructor(){
    this.categories=["Appetizers","Entrées","Sides","Desserts","Beverages","Other"];

    this.list = {
            0: new Array(),    
            1: new Array(),
            2: new Array(),
            3: new Array(),
            4: new Array(),
            5: new Array()
        };
    }
}
