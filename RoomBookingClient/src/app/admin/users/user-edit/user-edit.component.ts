import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  @Input()
  user:User;
  message :string;
  formUser :User;
  password :string;
  password2 :string;
  isNameValid = false;
  arePassValid = true;
  passwordMatch = true;

  constructor(private dataService :DataService, private router :Router, private formReset :FormResetService){}
  // binding direct user of @input to html element is shwoing direct change on screen without even save btn.
  // so we are making a clone of user in formUser with below method.
  ngOnInit(){ 
   this.initialization();
    this.formReset.formResetUserEvent.subscribe((user)=>{
      this.user = user;
      this.initialization();
    }) 
    }

    initialization(){
      this.formUser = Object.assign([],this.user);
      this.setIfNameIsValid();
      this.setIfPassValid();
    }
    
  addOrEditUser(){
    if(this.user.id){
    this.dataService.updateUsers(this.formUser).subscribe((user)=>
    this.router.navigate(['admin','users'],{queryParams :{id:user.id,action:'view'}}));
    }
    else{
      this.dataService.adduser(this.formUser).subscribe((user)=>
    this.router.navigate(['admin','users'],{queryParams :{id:user.id,action:'view'}}));
    }
  }

  setIfNameIsValid(){
    if(this.formUser.name){
    this.isNameValid = this.formUser.name.trim().length>0;
    }
    else
    {
      this.isNameValid = false;
    }
  }

  setIfPassValid(){
    if(this.user.id){
      this.arePassValid = true; // means we are in edit mode. so no use
    }
    else{
    this.passwordMatch = this.password === this.password2;
    if(this.password){
      this.arePassValid = this.password.trim().length>0;
    }
    else{
      this.arePassValid = false;
    }
  }
}
}
