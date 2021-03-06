import {HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";

import  'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")  
            return next.handle(req.clone());
       // if (localStorage.getItem('userToken') != null) {
            //return next.handle(req.clone());
        if (req.url === 'http://localhost:8983/solr/delta13/select?q=*:*')
            return next.handle(req.clone());
        if (req.url === 'http://localhost:8983/solr/delta13/dataimport?command=delta-import')    
            return next.handle(req.clone());
        if (window.location.href !== 'http://localhost:4200/signup' && window.location.href !== 'http://localhost:4200/login'){
                const clonedreq = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
                });
                console.log(window.location.href);
                return next.handle(clonedreq)
                    .do(
                        succ => { },
                        err => {
                            if (err.status === 401)
                                this.router.navigateByUrl('/login');
                        }
                    );
            }else{
                return next.handle(req.clone()); 
            }
                 
           // } 
        // else {
        //    // this.router.navigate(['/login']);
        //    //window.location.href = '/login';
        //       return next.handle(req.clone());
             
        // }    
    }
    
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (req.headers.get('No-Auth') == "True")
    //         return next.handle(req.clone());
    //     // if (localStorage.getItem('userToken') != null) {
    //     //         const clonedreq = req.clone({
    //     //             headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
    //     //         });
    //     //         return next.handle(clonedreq);
    //     //             // .do(
    //     //             //     succ => { },
    //     //             //     err => {
    //     //             //         if (err.status === 401)
    //     //             //             this.router.navigateByUrl('/login');
    //     //             //     }
    //     //             // );
    //     // } else {
    //     //         this.router.navigateByUrl('/login');
    //     // }    
    // }
    
}