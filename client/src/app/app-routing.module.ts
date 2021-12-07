import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/Tabs/products/products.component';
import { SalesComponent } from './components/Tabs/sales/sales.component';
import { SummaryComponent } from './components/Tabs/summary/summary.component';
import { SuppliersComponent } from './components/Tabs/suppliers/suppliers.component';
import { HappyDealComponent } from './pages/happy-deal/happy-deal.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  
  {path: 'HappyDeal', component: HappyDealComponent, 
      children:[
        {path: 'suppliers', component: SuppliersComponent},
        {path: 'products', component: ProductsComponent},
        {path: 'sales', component: SalesComponent},
        {path: 'summary', component: SummaryComponent},
      ]
    },
    {path: '', redirectTo: '**', pathMatch: 'full' },
    {path: '**', component: LoginComponent}

 
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
