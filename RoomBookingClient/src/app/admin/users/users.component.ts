import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users :Array<User>;
  selectedUser : User;
  action :string;
  constructor(private dataservice :DataService, private router :Router, private route :ActivatedRoute){

  }

  ngOnInit(){
    this.dataservice.getUsers().subscribe((usersData)=>this.users = usersData);
    this.route.queryParams.subscribe((param)=>
    {
      const id = param['id'];
      this.action = param['action'];
      if(id)
      this.selectedUser = this.users.find((user)=> user.id ==+ id);
    });
  } 

  setSelectedUser(id:number){
   this.router.navigate(['admin','users'],{queryParams : {id:id,action:'view'}});
  }

  addUser(){
    this.selectedUser = new User();
    this.router.navigate(['admin','users'],{queryParams : {action:'add'}});
  }
}
 