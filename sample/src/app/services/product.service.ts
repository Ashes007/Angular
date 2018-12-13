import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http'; 
import {Constant} from './../constant';

import { Observable } from 'rxjs/Observable';    
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http, private constant:Constant) { }

  saveProduct(product){
  	console.log(product);
  	return this.http.post(this.constant.BASE_URL+'api/saveProduct/', product).map((response: Response) =>response.json());  
  }

  getProduct(){
  	return this.http.get(this.constant.BASE_URL+'api/getProduct/').map((response: Response) => response.json());
  }

  deleteProduct(id){
  	return this.http.get(this.constant.BASE_URL+'api/deleteProduct/'+id).map((response : Response) => response.json());
  }
  
  getSingleProduct(id)
  {
  	return this.http.get(this.constant.BASE_URL+'api/getSingleProduct/'+id).map((response : Response) => response.json());
  }

  updateProduct(product)
  {
  	return this.http.post(this.constant.BASE_URL+'api/updateProduct/', product).map((response: Response) =>response.json());
  }


}
