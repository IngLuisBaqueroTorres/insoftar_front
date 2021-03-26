import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import {TablesComponent} from './components/pages/tables/tables.component';
import {AddUserComponent} from './components/pages/add-user/add-user.component';
import {UserDetailComponent} from './components/pages/user-detail/user-detail.component';
import {RegisterComponent} from './components/auth/register/register.component';
import { AuthenticationGuard } from './components/guards/authentication.guard';
const routes: Routes = [
  {
    path: '',
    component: ContainerAppComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
        import('./components/auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'usuarios',
        canActivate: [AuthenticationGuard],
        component: TablesComponent
      },
      {
        path: 'usuarios/crear',
        canActivate: [AuthenticationGuard],
        component: AddUserComponent
      },
      {
        path: 'usuarios/editar/:id',
        canActivate: [AuthenticationGuard],
        component: UserDetailComponent
      },
      {
        path: 'registrar',
        component: RegisterComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
