import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormsModule, Validators } from '@angular/forms';
import {Http,Response, Headers, RequestOptions } from '@angular/http';


import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService:ProductService, private router:Router, private formBuilder: FormBuilder) { }

  
  
  ngOnInit() {
  
  }

    productForm =this.formBuilder.group({
  	productName: new FormControl('',[Validators.required]),
  	price: new FormControl('',[Validators.required, Validators.pattern('[0-9]*')]),
  	description: new FormControl(''),
  	image: new FormControl('')
  });

  filesToUpload: Array<File> = [];  
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onSave = function (product){

  const files: Array<File> = this.filesToUpload;
  const productimg: any = new FormData();

  if(files.length>0)
   	productimg.append("img", files[0], files[0]['name']);

  productimg.append("productName",product.productName); 
  productimg.append("price",product.price);
  if(product.description != undefined)
  	productimg.append("description",product.description);

  	this.productService.saveProduct(productimg).subscribe(data=>{
  		this.router.navigate(['/product']);
  		//console.log(data);
  	});
  }

}
