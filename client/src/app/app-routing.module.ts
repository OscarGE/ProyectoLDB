import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/Tabs/products/products.component';
import { SalesComponent } from './components/Tabs/sales/sales.component';
import { SummaryComponent } from './components/Tabs/summary/summary.component';
import { SuppliersComponent } from './components/Tabs/suppliers/suppliers.component';
import { HappyDealComponent } from './pages/happy-deal/happy-deal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { UpdataSuppliersComponent } from './components/Tabs/suppliers/updata-suppliers/updata-suppliers.component';
import { SeeSuppliersComponent } from './components/Tabs/suppliers/see-suppliers/see-suppliers.component';
import { UpdataProductComponent } from './components/Tabs/products/updata-product/updata-product.component';
import { SeeProductComponent } from './components/Tabs/products/see-product/see-product.component';

const routes: Routes = [
  
    {path: 'HappyDeal', component: HappyDealComponent, 
      children:[
        {path: 'suppliers', component: SuppliersComponent},
        {path: 'suppliers/see/:id', component: SeeSuppliersComponent},
        {path: 'suppliers/update/:id', component: UpdataSuppliersComponent},
        {path: 'products', component: ProductsComponent},
        {path: 'products/see/:id', component: SeeProductComponent},
        {path: 'products/update/:id', component: UpdataProductComponent},
        {path: 'sales', component: SalesComponent},
        {path: 'summary', component: SummaryComponent},
      ]
    },
    {path: 'registeruser', component:  RegisterUserComponent},
    {path: '', redirectTo: '**', pathMatch: 'full' },
    {path: '**', component: LoginComponent},
    
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
