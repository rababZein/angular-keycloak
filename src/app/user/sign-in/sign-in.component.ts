import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;

  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName,password){
    localStorage.setItem('userName',userName);
    console.log(localStorage.getItem('userName'));
    localStorage.setItem('password',password);
    this.userService.userAuthentication(userName,password)
    .subscribe((data : any)=>{
      console.log(data);
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      console.log(err);
    });
 }

}
