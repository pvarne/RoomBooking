import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Layout, LayoutCapacities, Room } from 'src/app/model/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent {

  @Input()
  room :Room;
  layoutEnum = Layout; // Enum which is declared in room.ts model file.
  layouts = Object.keys(this.layoutEnum); // extracting enum layout and its keys from room model i.e object.

  //Instead of binding single single vars to all elements in html we can create a formgroup and assign soem controls
  roomsForm = new  UntypedFormGroup({
    roomName : new UntypedFormControl('roomName'),
    roomLocation : new UntypedFormControl('roomLocation')
  });
 //roomName = new FormControl('roomName'); //  roomName is the label which is going to match the label on form.
 //this is done seperetely justto understand declerations els it should be pasted in formGroup.

 ngOnInit(){
  this.roomsForm.patchValue({
    roomName : this.room.name,
    roomLocation:this.room.location
  });
  for(const control of this.layouts){
  this.roomsForm.addControl(`Layout${control}`,new UntypedFormControl('', Validators.required),);
  }
 }

 onSubmit(){
  this.room.name = this.roomsForm.controls['roomName'].value;
  this.room.location = this.roomsForm.controls['roomLocation'].value;
  this.room.capacities = new Array<LayoutCapacities>(); // because we are resetting this values as forms have no any value when we click on edit button
  for(const layout of this.layouts){ // this loop for adding the values of layouts by retriving it from form.
    const layoutCapacity = new LayoutCapacities();
    layoutCapacity.layout = Layout[layout];
    layoutCapacity.capacity = this.roomsForm.controls[`Layout${layout}`].value; // form control name
    this.room.capacities.push(layoutCapacity);
  }
}
}

