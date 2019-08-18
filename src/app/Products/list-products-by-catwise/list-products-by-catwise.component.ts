import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-list-products-by-catwise',
  templateUrl: './list-products-by-catwise.component.html',
  styleUrls: ['./list-products-by-catwise.component.css']
})
export class ListProductsByCatwiseComponent implements OnInit {

  products :any[] = [];
  
  constructor(public activeRoute : ActivatedRoute, public pdtser : ProductsService) { }

  ngOnInit() {

   this.activeRoute.params.subscribe((param:Params)=>{

    console.log(param);

    this.pdtser.getProductsByCatwise(param.catId).subscribe((data:any[])=>{

      console.log(data);

      this.products = data;

    }, (error:any)=>{

      console.log(error);

    });

   })
  }

}
