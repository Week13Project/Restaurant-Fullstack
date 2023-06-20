import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { Restaurant } from 'src/app/model/restaurant'; 
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.component.html',
  styleUrls: ['./addrestaurant.component.css']
})
export class AddrestaurantComponent {
  restaurant:Restaurant;
  
  control = new FormControl();

  editing: boolean = false;
  editid:any;
  userid!:any;
  routeid:string|null;
  action:string="Add";

  restaurantForm!: FormGroup;
  
  public imagePath: any;
  imgURL: any;
  public message: string;
  
  constructor(private service: RestaurantService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.restaurant=new Restaurant();
    
    const headers = sessionStorage.getItem("headers");
    this.userid = sessionStorage.getItem("userid");
    
    // this.getRestaurant(this.routeid);
    
    if(headers == null){
      this.router.navigate(["/login"]);
    }

    this.restaurantForm = new FormGroup({
      name: new FormControl(this.restaurant?.name, [
        Validators.required
      ]),
      address: new FormControl(this.restaurant?.address, [
        // Validators.required
      ]),
      phone: new FormControl(this.restaurant?.phone, [
        // Validators.required
      ]),
      price: new FormControl(this.restaurant?.price, [
        Validators.required
      ]),
      path: new FormControl(this.restaurant?.path)
    });

    this.editid = this.route.snapshot.paramMap.get('restaurantid');
    console.log(this.editid);
    
    if(this.editid!==undefined&&this.editid!==null){
      this.editing =true;
      this.edit();
    }else{
      this.restaurantForm.patchValue({path: "assets/img/food/hamburger.jpg"});
      this.restaurant=this.restaurantForm.value;
    }
    
  }

  get name(): any { return this.restaurantForm.get('name');}
  get address(): any { return this.restaurantForm.get('address');}
  get phone(): any { return this.restaurantForm.get('phone');}
  get price(): any { return this.restaurantForm.get('price');}
  
  // getRestaurant(routeid: string | null) {

  //   this.service.getRestaurantById(routeid).subscribe({
  //     next: (response) => this.r=response,
  //     error: (error) => console.log(error),
  //   });
  // }
  
  edit():void{
    this.action = "Edit";

    this.service.getRestaurantById(this.editid).subscribe({
      next: (response) => {
        console.log(response);
      this.restaurantForm.patchValue({
        name: response.name,
        address: response.address,
        phone: response.phone,
        price: response.price.toString(),
        path: response.path
      });
      this.restaurant=this.restaurantForm.value;
      this.onChange();
    },
      error: (error) => console.log(error),
    });
  }

  onChange() { 
    this.restaurant=this.restaurantForm.value;
    console.log(this.restaurant);
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
      this.restaurant.path = reader.result;
    }

 }

  onSubmit() { 
    this.restaurant=this.restaurantForm.value;
    if(this.routeid!==null){
      this.restaurant.restaurantId = parseInt(this.routeid);
    }
    this.restaurant.owner=parseInt(this.userid);
    this.restaurant.price=parseInt(this.restaurantForm.value.price);
    console.log(this.restaurant);
    
      if(this.editing){ 
        this.restaurant.restaurantId=parseInt(this.editid);
        console.log(this.restaurant);
        this.service.updateRestaurant(this.restaurant).subscribe({
          next: (response) => {
            this.openSnackBar("Restaurant edit successfully");
            // this.router.navigate(["/home/"+this.r.restaurantId+"/menu"]);
        },
          error: (error) => this.openSnackBar("Restaurant edit failed"),
        });
      } else {
        this.service.postRestaurant(this.restaurant).subscribe({
          next: (response) =>
          { 
            console.log(response);
            this.openSnackBar("Restaurant posted successfully");
            // this.router.navigate(["/home/"+this.r.restaurantId+"/menu"]);
          },
          error: (error) => {
            console.log(error);
            this.openSnackBar("Restaurant posted failed");
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

