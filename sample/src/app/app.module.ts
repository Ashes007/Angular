import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Constant} from './constant';

import {UserService} from './services/user.service';
import {ProductService} from './services/product.service';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add/add.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
 

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    FileSelectDirective    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService,ProductService, Constant],
  bootstrap: [AppComponent]
})
export class AppModule { }
