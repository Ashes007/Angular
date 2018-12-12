import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add/add.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

const routes: Routes = [
	{ path: 'about', component: AboutComponent },
	{ path: 'user', component: UserComponent },
	{ path: 'user/add', component: AddUserComponent },
	{ path: 'user/edit/:id', component: EditUserComponent },
	{ path: 'product', component: ProductComponent },
	{ path: 'product/add', component: ProductAddComponent },
	{ path: 'product/edit/:id', component: ProductEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
