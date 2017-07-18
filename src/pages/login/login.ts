import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController } from "ionic-angular";
import { AuthService } from "../service/auth.service";

@Component({
selector:'login',
templateUrl:'login.html',
})
export class LoginComponent implements OnInit {
  private form : FormGroup;

  constructor(public fb: FormBuilder,
              public navCtrl: NavController,
              public authService:AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
    });
  }

  login(){
    let username = this.form.value["username"];
    let password = this.form.value["password"];
    this.authService.login(username, password).subscribe((res) => {
      console.log("RES", res);
      this.verifySuccessfully(res);
    });
    console.log(this.form.value)
  }
  public verifySuccessfully(res) {
    localStorage.setItem("access_token", res.access_token);
    console.log(res);
    this.getUserInfo();
  }
   public getUserInfo() {
    this.authService.getUserInfo().subscribe((res) => {
      this.loggedInSuccesfully(res);
    }, (err) => {
      //this.loading.dismiss();
    });
  }
  public loggedInSuccesfully(raaes) {
    console.log(raaes)
   
  }
}