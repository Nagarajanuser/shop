import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../Services/products.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  myCategories :any[] = [];
  pdtCat = "";

  selectedImg : any;
  constructor(public pdtsService : ProductsService) { }

  ngOnInit() {
   
      this.pdtsService.getCategoriesList().subscribe((data:any[])=>{

        console.log(data);
  
        this.myCategories = data;
      }, (error:any)=>{
  
        console.log(error);
  
      });
  }

  onSelectedImg(event:any)
  {
    this.selectedImg = event.target.files[0];
    console.log(this.selectedImg);
  }
  
  createProducts(form:NgForm)
  {
    console.log(form.value);

    var fd = new FormData();

    fd.append("pdtCatId", form.value.pdtCat);
    fd.append("pdtName", form.value.pdtName);
    fd.append("pdtPrice", form.value.pdtPrice);
    fd.append("pdtDesc", form.value.pdtDesc);


    fd.append("pdtImg", this.selectedImg, "productImg");

      this.pdtsService.addProducts(fd).subscribe((data:any)=>{

        console.log(data);

      }, (error:any)=>{

        console.log(error);
        
      })
  }
  /*addProducts(form:NgForm){
    this.pdtsService.doAddProducts(form.value).subscribe((data:any)=>{
      console.log(data);
    }, (error:any)=>{
      console.log(error);
    });
    form.reset();
  } */

  /*ngOnDestroy()
  {
    this.subscribe.unsubscribe();
    console.log("Add product destroyed");
  }
*/
}
