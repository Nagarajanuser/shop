import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../Services/products.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  PdtCategories : any[] = [];
  subscribe : Subscription;

  constructor(public pdtService : ProductsService, public router : Router) { }

  ngOnInit() {
    this.subscribe = this.pdtService.getCategoriesList().subscribe((data:any[])=>{

      console.log(data);
  
      this.PdtCategories = data;
  
      }, (error:any)=>{
  
        console.log("my observar error", error);
  
      }, ()=>{
  
        console.log("completed");
      });
  }

}
