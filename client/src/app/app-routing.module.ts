import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/Tabs/products/products.component';
import { SalesComponent } from './components/Tabs/sales/sales.component';
import { SummaryComponent } from './components/Tabs/summary/summary.component';
import { SuppliersComponent } from './components/Tabs/suppliers/suppliers.component';

const routes: Routes = [
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
