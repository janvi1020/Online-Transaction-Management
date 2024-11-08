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
import { SignupComponent } from './signup/signup.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {path:'accounts' , component:AccountListComponent, canActivate: [AuthGuard]},
  {path:'create-account' , component:CreateAccountComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Route for the homepage
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to homepage
  {path:'deposit/:id',component:DepositComponent ,canActivate: [AuthGuard]},
  { path: 'withdraw/:id', component: WithdrawComponent ,canActivate: [AuthGuard]} ,// Route for withdraw page
  { path: 'delete/:id', component: DeleteAccountComponent ,canActivate: [AuthGuard]},
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard]} ,
  { path: 'login', component: LoginComponent },
  { path: 'transaction-history/:id', component: TransactionHistoryComponent ,canActivate: [AuthGuard]},
  { path: 'all-accounts', component: AllAccountsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
