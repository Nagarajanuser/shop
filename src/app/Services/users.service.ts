import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(public http : HttpClient) { }

  doUserRegistration(data:any)
  {
    console.log(data);

   return this.http.post("http://localhost:3000/register", data);
  }

  doUserLogin(data:any)
  {
    return this.http.post("http://localhost:3000/login", data);
  }

  isLoggedIn()
  {
   return !!localStorage.getItem("token");
  }
  getMyKey()
  {
    return localStorage.getItem("token");
  }

 
  
}
