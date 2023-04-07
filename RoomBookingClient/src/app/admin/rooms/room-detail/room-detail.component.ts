import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {
  
  @Input()
  room:Room | undefined;
  constructor( private router :Router){}

  editRoom(){
    this.router.navigate(['admin','rooms'],{queryParams:{id:this.room.id,action:'edit'}});
  }
}
