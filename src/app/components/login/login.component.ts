import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  loginForm!: FormGroup;
  failed: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder){
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required
      ]),
      password: new FormControl(this.password, [
        Validators.required
      ])
    });
  }
  
  get u(): any { return this.loginForm.get('username');}
  get p(): any { return this.loginForm.get('password');}
  
  async login(){
    // let resp = this.service.login(this.loginForm.value);
    // resp.subscribe({
    //   next: async () => {
    //     var userid = await this.service.userid(this.loginForm.value.username);

    //     sessionStorage.setItem("userid", userid);

    //     this.router.navigate(["/main/projects/"+userid]);
    //   },
    //   error: (error) =>  this.failed = true
    // });
  }
}
