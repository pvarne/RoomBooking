import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  rooms :Array<Room> | undefined ;
  selectedRoom: Room | undefined ;
  action :string;

  constructor(private dataService :DataService, private route :ActivatedRoute, private router:Router){
  }
  
  ngOnInit(){
   this.dataService.getRooms().subscribe((roomsData)=>this.rooms = roomsData);
    this.route.queryParams.subscribe((param)=>{
      const id = param['id'];
      this.action = param['action'];
      if(id){
        this.selectedRoom = this.rooms?.find((room)=>room.id==+id);
      }
      if(this.action === 'add'){
        this.selectedRoom = new Room;
        this.action = 'edit'; // we did this block on add button click in user component(here a slight change)
      }
    });
    
  }
  
  setSelectedRoom(Id :number | undefined){
    this.router.navigate(['admin','rooms'],{queryParams : {id : Id, action:'view'}});
  }

  addRoom(){
    this.router.navigate(['admin','rooms'],{queryParams:{action:'add'}});
  }

}
