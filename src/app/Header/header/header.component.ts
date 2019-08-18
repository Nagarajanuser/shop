import { UsersService } from './../../Services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems : number = 0;

  constructor(public userSer : UsersService, public router : Router, public pdtSer : ProductsService) { }

  getMyCartCount()
  {
    this.pdtSer.getCartCount().subscribe((data:number)=>{

      console.log(data);
  
      this.cartItems = data;
  
     }, (error:any)=>{
  
      console.log(error);
  
     });
  }

  ngOnInit() {

    // this.userSer.isLoggedIn();
 
    this.getMyCartCount();
 
    this.pdtSer.updatecart.subscribe((data:any)=>{
 
     //console.log(data);
 
    // this.cartItems++;
 
    this.getMyCartCount();
 
 
    })
   }

  doLogout()
  {
    localStorage.removeItem("token");
    this.cartItems = 0;
    this.router.navigateByUrl("/");

  }

}
