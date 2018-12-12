import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }
  productList;

  ngOnInit() {
  	this.productService.getProduct().subscribe(data => this.productList = data);
  }

  deleteProduct = function(id){
  	this.productService.deleteProduct(id).subscribe(data => { console.log(data); this.ngOnInit();} );
  }

}
