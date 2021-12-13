import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SuppliersComponent } from './components/Tabs/suppliers/suppliers.component';
import { ProductsComponent } from './components/Tabs/products/products.component';
import { SalesComponent } from './components/Tabs/sales/sales.component';
import { SummaryComponent } from './components/Tabs/summary/summary.component';
import { HappyDealComponent } from './pages/happy-deal/happy-deal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { UpdataSuppliersComponent } from './components/Tabs/suppliers/updata-suppliers/updata-suppliers.component';
import { SeeSuppliersComponent } from './components/Tabs/suppliers/see-suppliers/see-suppliers.component';
import { UpdataProductComponent } from './components/Tabs/products/updata-product/updata-product.component';
import { SeeProductComponent } from './components/Tabs/products/see-product/see-product.component';
import { SellSalesComponent } from './components/Tabs/sales/sell-sales/sell-sales.component';

//Servicios
import { UserService } from './services/user_service/user.service';
import { ProviderService } from './services/provider_service/provider.service';
import { ProductService } from './services/product_service/product.service';
import { SalesService } from './services/sales_service/sales.service';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SuppliersComponent,
    ProductsComponent,
    SalesComponent,
    SummaryComponent,
    HappyDealComponent,
    LoginComponent,
    RegisterUserComponent,
    SeeProductComponent,
    UpdataProductComponent,
    SeeSuppliersComponent,
    UpdataSuppliersComponent,
    SellSalesComponent
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
    ProductService,
    SalesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
