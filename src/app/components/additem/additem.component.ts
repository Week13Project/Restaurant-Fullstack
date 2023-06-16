import { Component, Input } from '@angular/core';
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

  add:string = "Add";
  editing: boolean = false;
  editid:any;
  userid!:any;
  routeid:string|null;

  itemForm!: FormGroup;
  
  public imagePath: any;
  imgURL: any;
  public message: string;
  
  constructor(private service: RestaurantService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    // this.userid = sessionStorage.getItem("userid");
    this.routeid = this.route.snapshot.paramMap.get('restaurantid');
    
    const headers = sessionStorage.getItem("headers");
    
    if(headers == null){
      this.router.navigate(["/login"]);
    }

    // this.service.findAll(this.userid).subscribe((data) => {
    //   const t : Set<string> = new Set<string>();
      
    //   data.forEach(project => project.skills?.split(", ").forEach(s => t.add(s)));

    //   this.tags = Array.from(t.values());
    // });
    // const urlreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.editid = this.route.snapshot.paramMap.get('projectid');
    
    if(this.editid!==undefined&&this.editid!==null){
      this.editing =true;
      this.edit();
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
    
    this.itemForm.patchValue({path: "assets/img/food/hamburger.jpg"});
    console.log(this.itemForm.value);
    this.item=this.itemForm.value;
    
  }

  get name(): any { return this.itemForm.get('name');}
  get price(): any { return this.itemForm.get('price');}
  get category(): any { return this.itemForm.get('category');}
  get description(): any { return this.itemForm.get('description');}
  

  edit():void{
    // this.add ="Edit";

    // this.service.find(this.editid).subscribe({
    //   next: (response) => 
    //   this.itemForm.patchValue({
    //     title: response.title,
    //     skills: response.github,
    //     github: response.github,
    //     site: response.site,
    //     description: response.description
    //   }),
    //   error: (error) => console.log(error),
    // });
  }

  onChange() { 
    this.item=this.itemForm.value;
    if(this.routeid!==null){
      this.item.restaurantId = parseInt(this.routeid);
    }
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
      // if(this.editing){ 
      //       this.service.update(this.itemForm.value, this.editid).subscribe({
      //       next: (response) => {
      //         this.openSnackBar("Project edit successfully");
      //         this.router.navigate(["/main/projects/"+this.userid]);
      //     },
      //       error: (error) => this.openSnackBar("Project edit failed"),
      //     });
      //   } else {
        
          this.service.postItem(this.itemForm.value).subscribe({
            next: (response) =>{ 
              this.openSnackBar("Item posted successfully");
              // this.router.navigate(["/main/projects/"+this.userid]);
          },
            error: (error) => {
              console.log(error);
              this.openSnackBar("Item posted failed");
            },
          });
        // }        
    }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

}

