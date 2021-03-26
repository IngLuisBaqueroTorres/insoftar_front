import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/shared/models/user-credentials';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm = new FormGroup({
    name:  new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    password_confirmation: new FormControl('', [Validators.required,Validators.minLength(6)])
  });
  constructor(private authSvc: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  onRegister(form: UserCredentials){

    if(this.registerForm.invalid==false){
      this.authSvc.register(form)
        .subscribe(res => {
          console.log('Successfully', res);
          this.route.navigate(['/usuarios']);
    })
    }

  }
}
