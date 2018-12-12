import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import {UserService} from '../../services/user.service'; 

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private newService :UserService) { }

  id;
  fname;
  userData; 
  firstName;
  lastName;
  valbutton ="Update"; 

  profileForm = new FormGroup({
  	id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params => {
  		this.id = params['id'];
    });
  	this.newService.GetSingleUser(this.id).subscribe(data => {this.firstName = data.fname, this.lastName = data.lname});
  	
  }

  onSave = function(user,isValid: boolean) {    
	 user.mode= this.valbutton;  
	 console.log(user);
	  this.newService.saveUser(user)  
	  .subscribe(data =>  {  
	    this.router.navigate(['/user']);
	    //alert(data.data);        
	  }   
	  , error => this.errorMessage = error )  
	    
	} 

}
