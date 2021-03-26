import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserModel } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/shared/models/user-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authSvc: AuthService, private route: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  ngOnInit() {}

  onLogin(form: UserCredentials) {

    if(this.loginForm.invalid==false){
      this.authSvc
      .login(form)
      .subscribe(res => {
        console.log('Successfully', res);
        this.route.navigate(['/usuarios']);
      })
    }

    }

}
