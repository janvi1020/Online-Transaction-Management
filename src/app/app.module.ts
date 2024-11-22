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
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { FAQComponent } from './faq/faq.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserService } from './users-list/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateFdComponent } from './create-fd/create-fd.component';
import { WithdrawFdComponent } from './withdraw-fd/withdraw-fd.component';
import { BreakFdComponent } from './break-fd/break-fd.component';
import { FDListComponent} from './fd-list/fd-list.component';
import { ToastrModule } from 'ngx-toastr';
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
    AllAccountsComponent,
    UserDetailComponent,
    CreateUserComponent,
    HomeAdminComponent,
    FAQComponent,
    UsersListComponent,
    CreateFdComponent,
    WithdrawFdComponent,
    BreakFdComponent,
    FDListComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
