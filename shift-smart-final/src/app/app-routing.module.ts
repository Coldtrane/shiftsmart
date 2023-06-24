import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TimeOffRequestComponent } from './time-off-request/time-off-request.component';
import { VacationBalanceComponent } from './vacation-balance/vacation-balance.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'department', component:DepartmentComponent},
  {path: 'employee', component:EmployeeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'time-off-request', component:TimeOffRequestComponent},
  {path: 'vacation-balance', component:VacationBalanceComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
