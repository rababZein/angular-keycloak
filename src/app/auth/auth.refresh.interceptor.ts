import {HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
//import { Observable } from "rxjs";

import  'rxjs/add/operator/catch';
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Rx';
import { stringify } from "querystring";

@Injectable()

export class AuthRefreshInterceptor implements HttpInterceptor{
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var rootUrl = 'http://localhost:8080/auth';
        var userName = localStorage.getItem('userName');
        var password = localStorage.getItem('password');
        var headerDict = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    
        var requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
        }
        var data = {
            "username" : userName,
            "password" : password,
            "client_id" : "tutorial-frontend",
            "grant_type" : "password"
        };
        
      return next.handle(request).catch((errorResponse: any ) => {
      //  console.log(errorResponse);
        const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;
  //console.log(errorResponse.status);
        if (errorResponse.status === 0 ) {
          const http = this.injector.get(HttpClient);
  
          return http.post<any>(rootUrl+'/realms/Demo-Realm/protocol/openid-connect/token',stringify(data),requestOptions )
        //  .do(succ=>{console.log('succ'+succ.status)}, err=>{console.log('err'+err.status)});
       /// .subscribe(result=>{headers}) ;
         .flatMap((data : any) => {
          // console.log(data.headers);
              localStorage.setItem('userToken', data.access_token);
              const cloneRequest = request.clone({setHeaders: {'Authorization': 'Bearer '+localStorage.getItem('userToken')}});
  
              return next.handle(cloneRequest);
            });
        }
  
        return Observable.throw(errorResponse);
      });
  
    }
  }