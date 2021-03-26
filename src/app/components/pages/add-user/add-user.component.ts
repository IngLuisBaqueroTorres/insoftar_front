import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserModel } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    cedula: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    apellidos: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")])
  });

  constructor(private userService:UserService, private router:Router) { }
  user:UserModel = new UserModel();
  ngOnInit(): void {
  }

  saveUser(user: UserModel){
    if(this.userForm.invalid==false){
      this.userService.create(user).subscribe(res=>{
        console.log(res);
        this.router.navigateByUrl("/usuarios");
      });
    }

  }
}
