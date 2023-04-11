import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  roomsForm :FormGroup;
  //Instead of binding single single vars to all elements in html we can create a formgroup and assign soem controls
  // roomsForm = new  UntypedFormGroup({
  //   roomName : new UntypedFormControl('roomName'),
  //   roomLocation : new UntypedFormControl('roomLocation')
  // }); //Comented this block for formBuilder.

 //roomName = new FormControl('roomName'); //  roomName is the label which is going to match the label on form.
 //this is done seperetely justto understand declerations els it should be pasted in formGroup.

 constructor(private formBuilder :FormBuilder){

 }

 ngOnInit(){
  // this.roomsForm.patchValue({
  //   roomName : this.room.name,
  //   roomLocation:this.room.location
  // });

  this.roomsForm = this.formBuilder.group( {
    roomName : [this.room.name,Validators.required],
    roomLocation :[this.room.location,[Validators.required,Validators.minLength(2)]]
  })
  for(const control of this.layouts){
 // this.roomsForm.addControl(`Layout${control}`,new UntypedFormControl('', Validators.required),);
 const layoutCapacity = this.room.capacities.find(lc => lc.layout === this.layoutEnum[control]);
 const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
 this.roomsForm.addControl(`Layout${control}`, this.formBuilder.control(initialCapacity));

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

