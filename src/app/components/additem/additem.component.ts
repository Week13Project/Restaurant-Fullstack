import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { Restaurant } from 'src/app/model/restaurant'; 
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent {
  r!:Restaurant;
  item:MenuItem
  
  control = new FormControl();

  editing: boolean = false;
  editid:any;
  userid!:any;
  routeid:string|null;
  action:string="Add";

  itemForm!: FormGroup;
  
  public imagePath: any;
  imgURL: any;
  public message: string;
  
  constructor(private service: RestaurantService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.item = new MenuItem();
    this.r=new Restaurant();
    this.routeid = this.route.snapshot.paramMap.get('restaurantid');
    
    const headers = sessionStorage.getItem("headers");
    
    this.getRestaurant(this.routeid);
    
    if(headers == null){
      this.router.navigate(["/login"]);
    }

    this.itemForm = new FormGroup({
      name: new FormControl(this.item?.name, [
        Validators.required
      ]),
      price: new FormControl(this.item?.price, [
        Validators.required
      ]),
      category: new FormControl(this.item?.category, [
        Validators.required
      ]),
      description: new FormControl(this.item?.description),
      path: new FormControl(this.item?.path)
    });

    this.editid = this.route.snapshot.paramMap.get('itemid');
    
    if(this.editid!==undefined&&this.editid!==null){
      this.editing =true;
      this.edit();
    }else{
      this.itemForm.patchValue({path: "assets/img/food/hamburger.jpg"});
      this.item=this.itemForm.value;
    }
    
  }

  get name(): any { return this.itemForm.get('name');}
  get price(): any { return this.itemForm.get('price');}
  get category(): any { return this.itemForm.get('category');}
  get description(): any { return this.itemForm.get('description');}
  
  getRestaurant(routeid: string | null) {

    this.service.getRestaurantById(routeid).subscribe({
      next: (response) => this.r=response,
      error: (error) => console.log(error),
    });
  }
  
  edit():void{
    this.action = "Edit";

    this.service.getItemById(this.editid).subscribe({
      next: (response) => {
        console.log(response);
      this.itemForm.patchValue({
        name: response.name,
        price: response.price,
        category: response.category,
        description: response.description,
        path: response.path
      });
      this.item=this.itemForm.value;
      this.onChange();
    },
      error: (error) => console.log(error),
    });
  }

  onChange() { 
    this.item=this.itemForm.value;
    console.log(this.item);
  } 
  
  handleUpload(files:any):void{
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.item.path = reader.result;
    }

 }

  onSubmit() { 
    this.item=this.itemForm.value;
    if(this.routeid!==null){
      this.item.restaurantId = parseInt(this.routeid);
    }
    console.log(this.item);
    
      if(this.editing){ 
        this.item.itemId=parseInt(this.editid);
        console.log(this.item);
        this.service.updateItem(this.item).subscribe({
          next: (response) => {
            this.openSnackBar("Item edit successfully");
            this.router.navigate(["/home/"+this.r.restaurantId+"/menu"]);
        },
          error: (error) => this.openSnackBar("Item edit failed"),
        });
      } else {
        this.service.postItem(this.item).subscribe({
          next: (response) =>
          { 
            console.log(response);
            this.openSnackBar("Item posted successfully");
            this.router.navigate(["/home/"+this.r.restaurantId+"/menu"]);
          },
          error: (error) => {
            console.log(error);
            this.openSnackBar("Item posted failed");
          },
        });
      }        
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

} 

