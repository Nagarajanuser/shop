import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsersService } from './Services/users.service';

@Injectable()
export class TokeninterceptorService  implements HttpInterceptor{

  constructor(public userSer : UsersService) { }
  intercept(req, next)
  {

    //console.log("inter");

    var tokenizedReq = req.clone({
      setHeaders : {
        Authorization : (this.userSer.getMyKey()) ? this.userSer.getMyKey() : ''
      }
    });

    console.log(tokenizedReq);

  return  next.handle(tokenizedReq);

  }
}
