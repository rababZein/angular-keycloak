import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private userService : UserService, private router:Router, private http : HttpClient) { }
  user:any;
  ngOnInit() {
    this.userService.getuserInfo().subscribe(
      (data:any) => {
        //console.log(data.sub);
        this.user=data;
       
      }
    );
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
