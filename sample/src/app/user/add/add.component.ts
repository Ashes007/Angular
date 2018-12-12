import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import {UserService} from '../../services/user.service'; 

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private newService :UserService, private router: Router) { }
  Repdata;  
  valbutton ="Save"; 

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  ngOnInit() {
  }

onSave = function(user,isValid: boolean) {    
 user.mode= this.valbutton;  
 //console.log(user);
  this.newService.saveUser(user)  
  .subscribe(data =>  {  
    this.router.navigate(['/user']);
    //alert(data.data);        
  }   
  , error => this.errorMessage = error )  
    
}  

  onSubmit() {
	  // TODO: Use EventEmitter with form value
	  console.warn(this.profileForm.value);
	}

}
