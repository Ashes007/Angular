import { Component, OnInit } from '@angular/core';

import {UserService} from '../services/user.service'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	title = 'User';

  constructor(private newService :UserService) { }
  userData; 

  ngOnInit() {  	 
  	this.newService.GetUser().subscribe(data =>  this.userData = data); 
  }

  delete = function(id) {  
	this.newService.deleteUser(id)  
	.subscribe(data =>   { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error )   
 }

}
