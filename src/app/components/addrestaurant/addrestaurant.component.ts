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
  bucketUrl: string = "https://rfsp.s3.us-east-2.amazonaws.com/";

  restaurant:Restaurant;
  
  control = new FormControl();

  editing: boolean = false;
  editid:any;
  userid!:any;
  routeid:string|null;
  action:string="Add";
  isFiles: boolean;

  restaurantForm!: FormGroup;
  
  public imagePath: any;
  imgURL: any;
  public message: string;
  previewImg: string | ArrayBuffer | null;
  isImages: boolean;
  
  constructor(private service: RestaurantService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.restaurant=new Restaurant();
    this.routeid = this.route.snapshot.paramMap.get('restaurantid');
    
    const headers = sessionStorage.getItem("headers");
    this.userid = sessionStorage.getItem("userid");
    
    if(headers == null){
      this.router.navigate(["/login"]);
    }

    this.restaurantForm = new FormGroup({
      name: new FormControl(this.restaurant?.name, [
        Validators.required
      ]),
      address: new FormControl(this.restaurant?.address, [
        Validators.required
      ]),
      phone: new FormControl(this.restaurant?.phone, [
        Validators.required
      ]),
      price: new FormControl(this.restaurant?.price, [
        Validators.required
      ]),
      imgPath: new FormControl(this.restaurant?.imgPath),
      filePath: new FormControl(this.restaurant?.filePath, [
        Validators.required
      ]),
    });
    
    this.previewImg="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
    this.restaurant.imgPath=this.previewImg;

    this.editid = this.route.snapshot.paramMap.get('restaurantid');
    console.log(this.editid);
    
    if(this.editid!==undefined&&this.editid!==null){
      this.editing =true;
      this.edit();
    }
    
  }

  get name(): any { return this.restaurantForm.get('name');}
  get address(): any { return this.restaurantForm.get('address');}
  get phone(): any { return this.restaurantForm.get('phone');}
  get price(): any { return this.restaurantForm.get('price');}
  get docfile(): any { return this.restaurantForm.get('filePath');}
  
  edit():void{
    this.action = "Edit";

    this.restaurantForm = new FormGroup({
      name: new FormControl(this.restaurant?.name, [
        Validators.required
      ]),
      address: new FormControl(this.restaurant?.address, [
        Validators.required
      ]),
      phone: new FormControl(this.restaurant?.phone, [
        Validators.required
      ]),
      price: new FormControl(this.restaurant?.price, [
        Validators.required
      ]),
      imgPath: new FormControl(this.restaurant?.imgPath),
      filePath: new FormControl(this.restaurant?.filePath),
    });

    this.service.getRestaurantById(this.editid).subscribe({
      next: (response) => {
        console.log(response);
      this.restaurantForm.patchValue({
        name: response.name,
        address: response.address,
        phone: response.phone,
        price: response.price.toString(),
        imgPath: response.imgPath
      });
      this.restaurant=this.restaurantForm.value;
      this.previewImg=this.restaurant.imgPath;
      
      this.onChange();
    },
      error: (error) => console.log(error),
    });
  }

  onChange() { 
    this.restaurant=this.restaurantForm.value;
    this.restaurant.imgPath = this.previewImg;
    console.log(this.restaurant);
  } 
  
  handleImageUpload(files:any):void{
    var path:any;
    if (files.length === 0){
      return;
    } else {
      this.isImages =true;
    }
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    // var reader = new FileReader();
    // path = files[0];
    // this.restaurantForm.patchValue({
    //   imgPath: path
    // });
 
    var reader = new FileReader();
    this.imagePath = files[0];
    
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.previewImg = reader.result;
      this.restaurant.imgPath = reader.result;
    }
  }

  handleFileUpload(files:any):void{
    var path:any;
    if (files.length === 0){
      return;
    } else {
      this.isFiles =true;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/application\/*/) == null) {
      this.message = "Only PDFs or DOC files are supported.";
      return;
    }

    var reader = new FileReader();
    path = files[0];
    this.restaurantForm.patchValue({
      filePath: path
    });

  }
  upload(filePath:any, ext:string){
    const file = new FormData(); 
    const name: string = this.routeid+"/"+this.restaurant.name+ext;
    // const bucketUrl: string = "https://rfsp.s3.us-east-2.amazonaws.com/";
    
    console.log(name);
    file.append('file', filePath, name);
    
    this.restaurantForm.patchValue({
      path: this.bucketUrl+name
    });

    // console.log(this.restaurantForm.value);
    // this.restaurant=this.restaurantForm.value;
    // console.log(this.restaurant);

    this.service.postFile(file).subscribe({
      next: (response) => 
    console.log("Uploaded "+name+" Successfully."),
      error: (error) => 
      console.log("Uploaded "+name+" Failed."),
    });
  }
  onSubmit() { 
    this.restaurant=this.restaurantForm.value;
    if(this.isImages){
      this.upload(this.imagePath,".jpg");
      this.restaurant.imgPath=this.bucketUrl+this.routeid+"/"+this.restaurant.name+".jpg"
      console.log(this.restaurant);
    }else if(this.previewImg!==undefined){
      this.restaurant.imgPath=this.previewImg;
    } else {
      this.restaurant.imgPath="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
    }
    if(this.isFiles){
      this.upload(this.restaurantForm.value.filePath,".pdf");
    }
    this.restaurant.filePath=this.bucketUrl+this.routeid+"/"+this.restaurant.name+".pdf"

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
            this.router.navigate(["/home/"+this.userid+"/r/restaurants"]);
        },
          error: (error) => this.openSnackBar("Restaurant edit failed"),
        });
      } else {
        this.service.postRestaurant(this.restaurant).subscribe({
          next: (response) =>
          { 
            console.log(response);
            this.openSnackBar("Restaurant posted successfully");
            this.router.navigate(["/home/"+this.userid+"/r/restaurants"]);
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
function getRandomInt() {
  const max:number =99999;
  return Math.floor(Math.random() * max);
}

