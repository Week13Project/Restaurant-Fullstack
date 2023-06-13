import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from '../../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  /** The ! means that the signupForm variable is not null*/
  signupForm!: FormGroup;

  message: any ="";
  failed: boolean = false;
  
  passwordMatch: boolean = true;

  constructor(private router: Router, private formBuilder: FormBuilder,public snackBar: MatSnackBar){
    this.signupForm = new FormGroup({
        username: new FormControl(this.username, [Validators.required]),
        password: new FormControl(this.password, [Validators.required]),
        confirmPassword: new FormControl(this.confirmPassword, [Validators.required])
      });
  }


  get u(): any { return this.signupForm.get('username');}
  get p(): any { return this.signupForm.get('password');}
  get cp(): any { return this.signupForm.get('confirmPassword');}

  checkUsername(){
  }
  
  checkPassword(){
    this.passwordMatch = this.signupForm.value.password===this.signupForm.value.confirmPassword;
  }

  addUser(){
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

}

