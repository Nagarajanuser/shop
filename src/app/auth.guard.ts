import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public obj:UsersService, public router:Router){}
  canActivate():boolean{
    if(this.obj.isLoggedIn()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }

  }
  
}
