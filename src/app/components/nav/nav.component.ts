import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersapiService } from 'src/app/services/usersapi.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  headers!: string | null;
  userid: string | null;
  loggedin: boolean | undefined;
  
  constructor(private service: UsersapiService, private router: Router){
    this.headers = sessionStorage.getItem("headers");
    this.userid = sessionStorage.getItem("userid");
  
    if(this.headers != null){
      this.loggedin=true;
  
    }
  }
  logout() {
    this.loggedin=false;
    this.service.logout();
    this.router.navigate(["/login"]);
  }
}
