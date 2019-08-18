import { UsersService } from './../../Services/users.service';
import { ProductsService } from './../../Services/products.service';
import { Component, OnInit,  OnDestroy } from '@angular/core';


import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit, OnDestroy {

  isShow:any;
  //listStatus:any;
  products : any[] = [];

  localusers :any[] = [];
  localusers1 :any;

  subscribe : Subscription;
  subscribe1 : Subscription;


  
  
    constructor(public pdtService : ProductsService, public userSer : UsersService) { }

  ngOnInit() {

    this.subscribe = this.pdtService.getProductsList().subscribe((data:any[])=>{

      console.log(data);
  
      this.products = data;
  
      }, (error:any)=>{
  
        console.log("my observar error", error);
  
      }, ()=>{
  
        console.log("completed");
      });

      console.log(this.products);
      console.log(this.isShow);

      
  }

  

  /*
  addToCart(){
    this.isShow = this.userSer.isLoggedIn()
   if(this.isShow){
     this.listStatus = "Proceed";
     this.pdtService.updatecart.emit("added");
   }else{
    this.listStatus = "Please Loin";
   }
  } 
  */
  addToCart(pdtId:number, pdtPrice:number)
  {
    console.log(pdtId, pdtPrice);
    
   // this.pdtService.updatecart.emit("added");

   this.pdtService.addToMyCart(pdtId, pdtPrice).subscribe((data:any)=>{

    console.log(data);

    this.pdtService.updatecart.emit("added");

   }, (error:any)=>{

    console.log(error);

   })
  }

  ngOnDestroy()
  {
    this.subscribe.unsubscribe();   
    console.log("component destroyed");
  }

}
