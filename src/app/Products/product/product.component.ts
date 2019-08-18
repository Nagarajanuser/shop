import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  
  subscribe : Subscription;

  singleProDetail:any;
  singleProhead:any;
  singleProprice:any;
  singleProdes:any;
  singleProimg:any;
  constructor(public pdtSer : ProductsService, public ActiveRoute:ActivatedRoute) { }

  ngOnInit() {

    this.subscribe = this.ActiveRoute.params.subscribe((param:Params)=>{
        console.log(param);
        this.pdtSer.getSingleproduct(param.proId).subscribe((data:any[])=>{
          console.log(data[0]);
          this.singleProDetail = data[0];
          this.singleProhead = this.singleProDetail.pdtName;
          this.singleProprice = this.singleProDetail.pdtPrice;
          this.singleProdes = this.singleProDetail.pdtDesc;
          this.singleProimg = this.singleProDetail.pdtImgPath;
        },(error:any)=>{
          //console.log(error);
        },()=>{
          //console.log("Completed");
        });
    });

    
  }


  ngOnDestroy()
  {
    this.subscribe.unsubscribe();   
    console.log("component destroyed");
  }

}
