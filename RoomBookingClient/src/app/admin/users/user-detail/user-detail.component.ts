import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  @Input()
  user :User;

  constructor(private router:Router, private dataService :DataService){

  }

  editUser(){
    this.router.navigate(['admin','users'],{queryParams :{id:this.user.id,action:'edit'}});
  }

  deleteUser(){
    this.dataService.deleteUser(this.user.id).subscribe((u)=>{
      this.router.navigate(['admin','users']);
    });
  }
  
}
