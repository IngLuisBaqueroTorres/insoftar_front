import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {baseUrl} from '../../../environments/environment';
import {AuthService} from './auth.service';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient,private authService:AuthService ) {
   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + this.authService.getToken()
    })
  };

  getAll(): Observable<UserModel[]> {

    return this.http.get<UserModel[]>(baseUrl+'/api/usuarios',this.httpOptions);
  }

  get(id): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${baseUrl}/api/usuarios/${id}/usuario`);
  }

  create(data:UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(baseUrl+'/api/usuarios/crear', data);
  }

  update(id, data:UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${baseUrl}/api/usuarios/actualizar/${id}`, data);
  }

  delete(id): Observable<UserModel> {
    return this.http.post<UserModel>(`${baseUrl}/api/usuarios/eliminar/${id}`,"");
  }
}
