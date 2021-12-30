import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditComponent } from './views/edit/edit.component';

const routes: Routes = [
  { path:'dashboard', component:DashboardComponent},
  { path:'edit/:id', component:EditComponent},
  { path:'**', redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
