import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';    
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http) { }

  saveProduct(product){
  	return this.http.post('http://localhost:8080/api/saveProduct/', product).map((response: Response) =>response.json());  
  }

  getProduct(){
  	return this.http.get('http://localhost:8080/api/getProduct/').map((response: Response) => response.json());
  }

  deleteProduct(id){
  	return this.http.get('http://localhost:8080/api/deleteProduct/'+id).map((response : Response) => response.json());
  }
  
  getSingleProduct(id)
  {
  	return this.http.get('http://localhost:8080/api/getSingleProduct/'+id).map((response : Response) => response.json());
  }

  updateProduct(product)
  {
  	return this.http.post('http://localhost:8080/api/updateProduct/', product).map((response: Response) =>response.json());
  }


}
