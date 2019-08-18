import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MycartComponent } from './mycart/mycart.component';
import { AuthGuard } from 'src/app/auth.guard';
import { AddproductComponent } from './addproduct/addproduct.component';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { ListProductsByCatwiseComponent } from './Products/list-products-by-catwise/list-products-by-catwise.component';
import { ProductComponent } from './Products/product/product.component';
const appRoutes : Routes = [
  {path:'', component:ListproductsComponent},
  {path:'login', component:LoginComponent},
  {path:'mycart', component:MycartComponent,canActivate:[AuthGuard]},
  {path:'product/:proId', component:ProductComponent},
  {path:'addproduct', component:AddproductComponent},
  {path:'categories', redirectTo:'/', pathMatch:'full'},
  {path:'categories/:catId', component:ListProductsByCatwiseComponent},
  {path:'**', component:NotfoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    ListproductsComponent,
    LoginComponent,
    NotfoundComponent,
    MycartComponent,
    AddproductComponent,
    ListProductsByCatwiseComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : TokeninterceptorService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
