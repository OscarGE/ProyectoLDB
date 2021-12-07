import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
