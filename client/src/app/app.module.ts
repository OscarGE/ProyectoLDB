import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SuppliersComponent } from './components/Tabs/suppliers/suppliers.component';
import { ProductsComponent } from './components/Tabs/products/products.component';
import { SalesComponent } from './components/Tabs/sales/sales.component';
import { SummaryComponent } from './components/Tabs/summary/summary.component';
import { HappyDealComponent } from './pages/happy-deal/happy-deal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

//Servicios
import { UserService } from './services/user_service/user.service';
import { ProviderService } from './services/provider_service/provider.service';
import { ProductService } from './services/product_service/product.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserFormComponent,
    SuppliersComponent,
    ProductsComponent,
    SalesComponent,
    SummaryComponent,
    HappyDealComponent,
    LoginComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,
    ProviderService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
