import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {UserModel} from '../../../shared/models/user.interface';
import {UserService} from '../../../shared/services/user.service';


const ELEMENT_DATA: UserModel[] = [
  {id:"1",correo:"k@.com",nombres:"Carlos",cedula:"10012312",apellidos:"wqeqw"},
  {id:"2",correo:"k@.com",nombres:"Eduardo",cedula:"3213219",apellidos:"asdsdaf"}
];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {


  displayedColumns: string[] = ['Id', 'Correo', 'Nombres', 'Cedula', 'Apellidos', 'Editar'];
  dataSource:UserModel[]=[];

  constructor(private userService:UserService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.actualizarTabla();
  }

  actualizarTabla(){
    this.userService.getAll().subscribe(res=>
      {
        this.dataSource = res;
        this.changeDetectorRefs.detectChanges();
      })
  }


  eliminar(id){
    this.userService.delete(id).subscribe(
      res=>{
        this.actualizarTabla();
      }
    );
  }

}
