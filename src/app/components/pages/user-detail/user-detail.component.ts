import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserModel } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {


  constructor(private userService:UserService,private route: ActivatedRoute, private router:Router) { }
  user:UserModel = new UserModel();
  id:string;

  userForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    cedula: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    apellidos: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")])
  });


  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).subscribe(res=>{

      this.user=res[0];
      this.setValues();

    })
  }

  saveUser(user: UserModel){
    if(this.userForm.invalid==false){
      this.userService.update(this.id, user).subscribe(res=>{
        console.log(res);
        this.router.navigateByUrl("/usuarios");
      }
      );
    }
  }

  setValues() {
    this.userForm
        .setValue({
          nombres: this.user.nombres,
            correo:  this.user.correo,
            cedula: this.user.cedula,
            apellidos: this.user.apellidos,
            telefono: this.user.telefono
        })
  }

}
