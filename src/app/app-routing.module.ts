import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { FAQComponent } from './faq/faq.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateFdComponent } from './create-fd/create-fd.component';
import { WithdrawFdComponent } from './withdraw-fd/withdraw-fd.component';
import { BreakFdComponent } from './break-fd/break-fd.component';
import { FDListComponent } from './fd-list/fd-list.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {path:'accounts' , component:AccountListComponent},
  {path:'create-account' , component:CreateAccountComponent},
  { path: 'home', component: HomeComponent}, // Route for the homepage
  { path: 'home-admin', component: HomeAdminComponent}, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to homepage
  {path:'deposit/:id',component:DepositComponent },
  { path: 'withdraw/:id', component: WithdrawComponent } ,// Route for withdraw page
  { path: 'delete/:id', component: DeleteAccountComponent },
  { path: 'transfer', component: TransferComponent} ,
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FAQComponent},
  { path: 'all-accounts', component: AllAccountsComponent},
  { path: 'user-details/:id', component: UserDetailComponent},
  { path: 'create-user', component: CreateUserComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'create-fd', component: CreateFdComponent },
  { path: 'withdraw-fd/:id', component: WithdrawFdComponent },
  { path: 'break-fd/:id', component: BreakFdComponent },
  { path: 'fd-list', component: FDListComponent }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
