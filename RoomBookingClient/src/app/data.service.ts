import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layout, LayoutCapacities, Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  private rooms: Array<Room> = new Array<Room>();
  private users: Array<User> = new Array<User>();

  // This is method called getRooms which returns Array/Observable of type Room. i.e after : content is RT.
  getRooms() : Observable<Array<Room>>{
    return of(this.rooms);
  }

  getUsers() : Observable<Array<User>>{
    return of(this.users);
  }

  constructor() {
    const room1 = new Room();
    room1.id = 1;
    room1.name= 'First Room';
    room1.location = 'First floor';

    const capacity1 = new LayoutCapacities();
    capacity1.capacity = 50;
    capacity1.id = 1;
    capacity1.layout = Layout.THEATER;
    room1.capacities.push(capacity1);

    //object properties for second room
    const room2 = new Room();
    room2.id = 2;
    room2.location ='Second Floor';
    room2.name ='Second Room';

    const capacity2 = new LayoutCapacities();
    capacity2.id  = 2;
    capacity2.capacity = 75;
    capacity2.layout = Layout.BOARD;
    room2.capacities.push(capacity2);

    //object properties for third room
    const room3 = new Room();
    room3.id = 3;
    room3.location ='Third location';
    room3.name = 'Third Room';

    const capacity3 = new LayoutCapacities();
    capacity3.id = 3;
    capacity3.capacity =20;
    capacity3.layout = Layout.USHAPE;
    room3.capacities.push(capacity3);

    //Pushing all these 3 objects into room array of object
    this.rooms.push(room1);
    this.rooms.push(room2);
    this.rooms.push(room3);

    //Creating the users object to add to user array.
    const user1 = new User();
    user1.id = 1;
    user1.name = "pvarne";
  
    const user2 = new User();
    user2.id = 2;
    user2.name = "Prathamesh";

    const user3 = new User();
    user3.id = 3;
    user3.name ="Anu";

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
   }

   updateUsers(user: User) :Observable<User> {
   const originalUser =  this.users.find((u)=> user.id === u.id);
   originalUser.name = user.name;
   return of(originalUser);
  }

  adduser(newUser:User):Observable<User>{
    // this.users.push(user);
    // return of(user);
    let id =0;
    for(let user of this.users)
    {
      if(user.id>id){
        id = user.id;
      }
    }
    newUser.id = id+1;
    this.users.push(newUser);
    return of(newUser);
  }

  updateRooms(room:Room){
    const orignalRoom = this.rooms.find(r => r.id === room.id );
    orignalRoom.name = room.name;
    orignalRoom.location = room.location;
    orignalRoom.capacities = room.capacities;
    return of(orignalRoom);
  }

  addRoom(newRoom:Room){
    let id = 0;
    for(const room of this.rooms){
      if(id < room.id){
        id = room.id;
      }
    }
    newRoom.id = id +1;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

}
