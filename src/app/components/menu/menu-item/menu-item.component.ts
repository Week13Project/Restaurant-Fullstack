import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() item:MenuItem;
  @Input() index:number;
  @Input() admin:boolean;
  @Output("updateMenu") updateMenu: EventEmitter<any> = new EventEmitter();

  constructor(private service: RestaurantService,public snackBar: MatSnackBar,private router: Router,private route: ActivatedRoute){}

  ngOnInit(){
    console.log(this.item.path);
    
    if(this.route.snapshot.routeConfig?.path!=":restaurantid/menu"){
      console.log(this.route.snapshot.routeConfig?.path);
      this.admin = false;
    }
    
    // if(this.item.path===undefined){
    //   this.item.path="assets/img/food/hamburger.jpg";
    // }
  } 
  editItem(){
    const restaurantid = this.route.snapshot.paramMap.get('restaurantid');
    this.router.navigate(["/home/"+restaurantid+"/"+this.item.itemId+"/edit"]);
  }

  public deleteConfirm() {
    if(confirm("Are you sure you want to delete " + name))
    {
      this.service.deleteItem(this.item.itemId).subscribe({
        next: (response) => {
          console.log(response);
          this.updateMenu.emit();
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
