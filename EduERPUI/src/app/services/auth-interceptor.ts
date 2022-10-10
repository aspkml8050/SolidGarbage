import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthServiceToken } from "./auth-tokens";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authGetToken: AuthServiceToken){}
    intercept(request: HttpRequest<any> , next: HttpHandler ): Observable<HttpEvent<any>>{
        const token = this.authGetToken.getAuthToken();
       let currentFormId= sessionStorage.getItem("currentFormId")?.toString();
       let strFormID = "-1" ;
       if (currentFormId){
           strFormID = currentFormId.toString()
       }
       if(token){
        request = request.clone({
                //setHeaders: {"Authorization" : 'Bearer ' + token }
                headers: new HttpHeaders({
                    //'Content-Type':  'application/json',
                    "Authorization" : 'Bearer ' + token,
                    "currentFormId": strFormID
                  })
        });
       // request = request.clone({
            //setHeaders: {"currentFormId" : currentFormId }
    //});
    }

    return next.handle(request);
    //.pipe(
        // //catch((err) =>{
        //      if(err instanceof HttpErrorResponse){
        //          if(err.status === 401 ){
        //              //...  to do redirect to logout.
        //          }
        //      }
        //      return throwError(err);
        // } )
  //  )

    }

}