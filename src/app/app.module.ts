import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountListComponent } from './account-list/account-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { TransferComponent } from './transfer/transfer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { FAQComponent } from './faq/faq.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserService } from './users-list/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    NavigationComponent,
    CreateAccountComponent,
    HomeComponent,
    DepositComponent,
    WithdrawComponent,
    DeleteAccountComponent,
    TransferComponent,
    LoginComponent,
    SignupComponent,
    TransactionHistoryComponent,
    AllAccountsComponent,
    UserDetailComponent,
    CreateUserComponent,
    HomeAdminComponent,
    FAQComponent,
    UsersListComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,      // Add FormsModule to use ngModel in forms
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
