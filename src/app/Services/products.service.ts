
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  updatecart = new EventEmitter();

  constructor(public http : HttpClient ) { }

  getProductsList()
  {
   return this.http.get("http://localhost:3000/listproducts");
    console.log("service method invoked");
  }
  getCategoriesList(){
    console.log("Service:getcat");
    return this.http.get("http://localhost:3000/listcategories");
  }
  doAddProducts(data:any){
    console.log("called doAddProducts");
    return this.http.post("http://localhost:3000/addproduct", data);
  }

  getMyCartItems()
  {
    return this.http.get("http://localhost:3000/mycart");
  }

  getCartCount()
  {
    console.log("ser error");
    return this.http.get("http://localhost:3000/getcartcount");
  }

  addToMyCart(pdtId:number, pdtPrice:number)
  {
    return this.http.post("http://localhost:3000/addtocart", {cartPdtId : pdtId, cartPdtPrice : pdtPrice});
  }


  addProducts(data:any)
  {
    return this.http.post("http://localhost:3000/addproduct", data);

  }


  getProductsByCatwise(catId:any)
  {
    return this.http.get("http://localhost:3000/listproductcat/"+catId);
  }


  updateCartItems(myCartId:number, myCartQty:number, myCartPdtPrice:number)
  {
    return this.http.post("http://localhost:3000/updatecart", {CartId:myCartId, CartQty:myCartQty, CartPdtPrice:myCartPdtPrice});
  }


  deleteMyCartItem(cartId:number)
  {
    return this.http.get("http://localhost:3000/deletecart/"+cartId);
  }
  getSingleproduct(proId:number){
    return this.http.get("http://localhost:3000/getsingleproduct/"+proId);
  }



}
