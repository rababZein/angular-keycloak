import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { stringify } from 'querystring';
import { User } from './user.model';
@Injectable()

export class UserService {
  readonly rootUrl = 'http://localhost:8080/auth';
    token: any;
  constructor(private http: HttpClient) { }
 


   getTokenForRegistration() {
    var headerDict = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    var requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict), 
    }
    var data = {
        "username" : "rabab_zein",
        "password" : "123",
        "client_id" : "tutorial-frontend",
        "grant_type" : "password"
    };
   return this.http.post(this.rootUrl+'/realms/Demo-Realm/protocol/openid-connect/token',
        stringify(data),requestOptions );
    //     .subscribe(
    // (res:any) => {
    //     this.token = res.access_token;
    //    // console.log(res.access_token);
    //    // return this.token; 
    //  });
    //  return this.token;
  }
  registerUser(user: User, access_token:string) {

    console.log('yarab'+access_token);
   

    return   this.http.post('http://localhost:8080/auth/admin/realms/Demo-Realm/users?realm=Demo-Realm',
        {
        "username" : user.UserName, 
        "enabled": true, 
        "email" : user.Email, 
        "firstName": user.FirstName, 
        "lastName": user.LastName, 
        "credentials" : [{ "type" : "password", "value" : user.Password } ], 
        "disableableCredentialTypes": [
            "password"
        ],
        "realmRoles": [ "user", "offline_access"  ], 
        "clientRoles": {"account": [ "manage-account" ] } 
        },{
            headers: new HttpHeaders({'Authorization':'Bearer '+access_token,
                                
                                    'Content-Type':'application/json'})
        });


}
  userAuthentication(userName, password) {
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
    return this.http.post(this.rootUrl+'/realms/Demo-Realm/protocol/openid-connect/token',
    stringify(data),requestOptions );
  }



}
