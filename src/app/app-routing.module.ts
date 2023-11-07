import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { FormComponent } from './MyComponents/form/form.component';
import { ListComponent } from './MyComponents/list/list.component';
import { DetailsPageComponent } from './MyComponents/details-page/details-page.component';
import { SignUpComponent } from './MyComponents/sign-up/sign-up.component';

const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "sign-up", component : SignUpComponent},
  {path : "form", component : FormComponent},
  {path : "list", component : ListComponent},
  {path : "details/:id", component : DetailsPageComponent},
  {path : "edit/:id", component : FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
