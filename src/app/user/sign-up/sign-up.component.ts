import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/user.model';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  token:string;
  constructor(private userService: UserService, private toastr: ToastrService) {
    localStorage.setItem('signup','signup');
   }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.getTokenForRegistration().subscribe(
          (res: any) =>{
            this.token = res.access_token;
            this.userService.registerUser(form.value,this.token)
            .subscribe((data: any) => {
             // console.log(data.status);
             // if (!data) {
                this.resetForm(form);
                this.toastr.success('User registration successful');
             // }
              // else
              //   this.toastr.error(data.Errors[0]);
            });
          });
          console.log(this.token);
   
  }

}
