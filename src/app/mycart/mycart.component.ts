import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  myCartItems :any[] = [];

  myCartItemTotalPrice : number;

  constructor(public pdtsSer : ProductsService, public router : Router) { }

  ngOnInit() {

    this.pdtsSer.getMyCartItems().subscribe((data:any[])=>{

      console.log(data);

      this.myCartItems = data;

      this.myCartItemTotalPrice = 0;

      for(var x in data)
      {
        this.myCartItemTotalPrice += data[x].cartPdtPrice;
      }

    }, (error:any)=>{

      console.log(error);
      
      localStorage.removeItem("token");

      this.router.navigateByUrl('/login');


    })
  }


  updateMyCartItems(myCartId:number, myCartQty:number, myCartPdtPrice:number)
  {

    //console.log(myCartId);
   // console.log(myCartQty);
   // console.log(myCartPdtPrice);

   this.pdtsSer.updateCartItems(myCartId, myCartQty, myCartPdtPrice).subscribe((data:any[])=>{

    console.log(data);

    this.myCartItems = data;

    this.myCartItemTotalPrice = 0;

    for(var x in data)
    {
      this.myCartItemTotalPrice += data[x].cartPdtPrice;

     
    }

   }, (error:any)=>{

    console.log(error);

   })

  }

  deleteCartItem(cartid:number)
  {
    this.pdtsSer.deleteMyCartItem(cartid).subscribe((data:any[])=>{

      console.log(data);

      this.pdtsSer.updatecart.emit();

      this.myCartItems = data;

      this.myCartItemTotalPrice = 0;
  
      for(var x in data)
      {
        this.myCartItemTotalPrice += data[x].cartPdtPrice;
  
       
      }

    }, (error:any)=>{

      console.log(error);

    })
  }



}
