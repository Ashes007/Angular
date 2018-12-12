import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: '../product-edit/product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(private router:Router, private activatedRoute: ActivatedRoute,private productService:ProductService) { }
									 
  id;
  productName;
  price;
  description; 
  image;

  productForm = new FormGroup({
  	id: new FormControl(''),
  	productName: new FormControl('',[Validators.required]),
  	price: new FormControl('',[Validators.required, Validators.pattern('[0-9]*')]),
  	description: new FormControl(''),
  	image: new FormControl('')
  });

  ngOnInit() {
	this.activatedRoute.params.subscribe(params => {
  		this.id = params['id'];
    });	

    this.productService.getSingleProduct(this.id).subscribe(data => { 
    	this.id 			= data._id;
    	this.productName 	= data.productName;
    	this.price 			= data.price;
    	this.description 	= data.description;
    	this.image 			= data.image;
    	
    });
  }

  filesToUpload: Array<File> = [];  
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onSave = function (product){

  	const files: Array<File> = this.filesToUpload;
  const productimg: any = new FormData();

  if(files.length>0)
   	productimg.append("img", files[0], files[0]['name']);
  productimg.append("id",product.id);  
  productimg.append("productName",product.productName); 
  productimg.append("price",product.price);
  if(product.description != undefined)
  	productimg.append("description",product.description);

  	this.productService.updateProduct(productimg).subscribe(data=>{
  		this.router.navigate(['/product']);
  		console.log(data);
  	});
  }

 

}