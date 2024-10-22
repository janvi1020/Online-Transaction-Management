import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { DepositComponent } from './deposit/deposit.component';

const routes: Routes = [
  {path:'accounts' , component:AccountListComponent},
  {path:'create-account' , component:CreateAccountComponent},
  { path: 'home', component: HomeComponent }, // Route for the homepage
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route to homepage
  {path:'deposit/:id',component:DepositComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
