import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
 
  Bookings : Array<Booking>;

  constructor(private dataService : DataService){
  }

  ngOnInit(){
   // this.selectedDate = formatDate(new Date(),"dd-mm-yyy",'en-Ind');
   this.getBookings();
  }
  
  getBookings(){
    this.dataService.getBooking().subscribe((bookings)=>{
      this.Bookings = bookings;
    });
  }
}
