import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant'; 
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent {
  r!:Restaurant;
  
  @Input() tags?: string[];
  control = new FormControl();

  add:string = "Add";
  editing: boolean = false;
  editid:any;
  userid!:any;
  
  newTag: string ="";

  projectForm!: FormGroup;
  
  vaidTag : boolean = true;
  tagerror : string ="";

  
  constructor(private service: RestaurantService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    // this.userid = sessionStorage.getItem("userid");
    
    // const headers = sessionStorage.getItem("headers");
    
    // if(headers == null){
    //   this.router.navigate(["/login"]);
    // }

    // this.service.findAll(this.userid).subscribe((data) => {
    //   const t : Set<string> = new Set<string>();
      
    //   data.forEach(project => project.skills?.split(", ").forEach(s => t.add(s)));

    //   this.tags = Array.from(t.values());
    // });
    // const urlreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    // this.editid = this.route.snapshot.paramMap.get('projectid');
    
    // if(this.editid!==undefined&&this.editid!==null){
    //   this.editing =true;
    //   this.edit();
    // }
    
    // this.projectForm = new FormGroup({
    //   title: new FormControl(this.p?.title, [
    //     Validators.required
    //   ]),
    //   skills: new FormControl(this.p?.skills),
    //   github: new FormControl(this.p?.github, [
    //     Validators.pattern(urlreg)
    //   ]),
    //   site: new FormControl(this.p?.site, [
    //     Validators.pattern(urlreg)
    //   ]),
    //   description: new FormControl(this.p?.title)
    // });
  }

  get title(): any { return this.projectForm.get('title');}
  get github(): any { return this.projectForm.get('github');}
  get site(): any { return this.projectForm.get('site');}
  

  // edit():void{
  //   this.add ="Edit";

  //   this.service.find(this.editid).subscribe({
  //     next: (response) => 
  //     this.projectForm.patchValue({
  //       title: response.title,
  //       skills: skillEdit(response.skills),
  //       github: response.github,
  //       site: response.site,
  //       description: response.description
  //     }),
  //     error: (error) => console.log(error),
  //   });
  // }

  onSubmit() { 
    // if(this.projectForm.value!==undefined){    
    //   if(this.projectForm.value.skills instanceof Array){   
    //     this.projectForm.value.skills = skillsList(this.projectForm.value.skills);
    //   }
    //   if(this.projectForm.value.github == ""){
    //     this.projectForm.value.github=null;
    //   }
    //   if(this.projectForm.value.site == ""){
    //     this.projectForm.value.site=null;
    //   }

    //     this.projectForm.value.id= this.editid;
    //     this.projectForm.value.uid= this.userid;
    //     console.log(this.projectForm.value);

    //   if(this.editing){ 
    //         this.service.update(this.projectForm.value, this.editid).subscribe({
    //         next: (response) => {
    //           this.openSnackBar("Project edit successfully");
    //           this.router.navigate(["/main/projects/"+this.userid]);
    //       },
    //         error: (error) => this.openSnackBar("Project edit failed"),
    //       });
    //     } else {
    //       this.service.save(this.projectForm.value).subscribe({
    //         next: (response) =>{ 
    //           this.openSnackBar("Project posted successfully");
    //           this.router.navigate(["/main/projects/"+this.userid]);
    //       },
    //         error: (error) => this.openSnackBar("Project posted failed"),
    //       });
    //     }        
    // }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  addNewTag(newTag: string){
    newTag = newTag.trim();
    var unique = !this.tags?.some(x => x.toLowerCase() == newTag.toLowerCase());
    
    if (unique&&newTag!=""){
      this.vaidTag = true;
      this.tags?.push(newTag);
    } else if (newTag==""){
      this.vaidTag = false;
      this.tagerror ="Tag can not be blank."
    } else {
      this.vaidTag = false;
      this.tagerror ="Tag already listed."
    }
  }

}

function skillsList(skills: string[]): any {

  if(skills!=null){
    if(skills.length>1){
      return skills.join(", ");
    } else if(skills.length==1) {
      return skills[0];
    } else{
      return null;
    }
  }
        
}

function skillEdit(skills: string ): string[] {
    
  if(skills !==null){  
    return skills.split(", ");
  }
  return [];
 
}

