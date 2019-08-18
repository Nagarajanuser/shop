import { UsersService } from './../Services/users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../Services/products.service';
import { HttpClient } from '@angular/common/http';

declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  localmsg:string;
  msg : string;
  details:any[]=[];

  constructor(public myRouter : Router, public userSer : UsersService, public pdtSer:ProductsService, public http:HttpClient ) { }

  ngOnInit() {

    $('.toggle').click(function(){
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
      height: "toggle",
      'padding-top': 'toggle',
      'padding-bottom': 'toggle',
      opacity: "toggle"
      }, "slow");
    });

  }

  doLogin(form:NgForm)
  {
      console.log("form submitted");

     // this.myRouter.navigate(['/']);
     //this.userSer.doUserLogin(form.value).subscribe((data:any[])=>{  // if not use JWT
      this.userSer.doUserLogin(form.value).subscribe((data:any)=>{
      console.log(data);
      if(data.length>0)
      {
        //localStorage.setItem("token", data[0]._id); // if not use JWT
        localStorage.setItem("token", data);
        this.pdtSer.updatecart.emit();
        this.myRouter.navigateByUrl('/');
      }
      else {
        this.msg = "Invalid Login";
      }
     }, (error:any)=>{
      console.log(error);
     });
    // this.myRouter.navigateByUrl('/');
  }

  doRegister(form:NgForm)
  {
    console.log(form.value);
    this.userSer.doUserRegistration(form.value).subscribe((data:any)=>{
      console.log(data);
    }, (error:any)=>{
      console.log(error);
    });
    form.reset();
  }

  // local JOSN login checked START
  doLocalLogin(form:NgForm){
    this.localmsg ="";
    console.log(form.value);
    console.log(form.value.localName);
    console.log(form.value.localPassword); 
    this.http.get("assets/userslist.json").subscribe((data:any)=>{
      this.details=data;
      console.log(this.details)
      for(let i in this.details){
        //console.log(this.details[i].userName);
        //console.log(this.details[i].passWord);
        /*if((form.value.localName == this.details[i].userName) && (form.value.localPassword == this.details[i].passWord) ) {
          this.localmsg ="Matched";
          console.log(this.localmsg);
          return;
        }else{
          this.localmsg ="Not Matched";
          console.log(this.localmsg);
        } */
        if((this.details[i].userName.toString().toLowerCase().indexOf(form.value.localName.toLowerCase())>=0)&&
        (this.details[i].passWord.toString().toLowerCase().indexOf(form.value.localPassword.toLowerCase())>=0)){
          this.localmsg ="Matched";
          console.log(this.localmsg);
          return;
        }else{
          this.localmsg ="Not Matched";
          console.log(this.localmsg);
        }
      }
    },(error:any)=>{console.log(error)},()=>{console.log("completed")});
  }
  // local JOSN login checked end



}
