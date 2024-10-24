import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { TransferComponent } from './transfer/transfer.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'accounts' , component:AccountListComponent, canActivate: [AuthGuard]},
  {path:'create-account' , component:CreateAccountComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent }, // Route for the homepage
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to homepage
  {path:'deposit/:id',component:DepositComponent},
  { path: 'withdraw/:id', component: WithdrawComponent } ,// Route for withdraw page
  { path: 'delete/:id', component: DeleteAccountComponent },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard]} ,
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
