import { EventEmitter, Injectable } from '@angular/core';
import { Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  formResetRoomEvent  = new EventEmitter<Room>;
  formResetUserEvent = new EventEmitter<User>;
  constructor() { }
}
