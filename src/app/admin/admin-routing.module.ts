import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductvarietiesComponent } from './productvarieties/productvarieties.component';

const routes: Routes = [
  {
    path:"", component:MainComponent,
    children:[
      {path:"dashboard", component:DashboardComponent},
      {path:"categories", component:CategoryComponent},
      {path:"products", component:ProductsComponent},
      {path:"product", component:ProductComponent},
      {path:"product/:id", component:ProductComponent},
      {path:"product/varieties/:id", component:ProductvarietiesComponent},
      {path:"orders", component:OrdersComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
