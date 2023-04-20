import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Layout, LayoutCapacities, Room } from 'src/app/model/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent  implements OnInit, OnDestroy{

  @Input()
  room :Room;
  formResetEventUnsubc : Subscription;
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

 constructor(private formBuilder :FormBuilder, private dataService :DataService, private router : Router,
  private formReset :FormResetService){

 }

 ngOnInit(){
    this.resetForm();
    this.formResetEventUnsubc = this.formReset.formResetRoomEvent.subscribe((room)=>{
      this.room = room;
      this.resetForm();
    })

 }

 resetForm(){
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
  if(this.room.id == null){
    this.dataService.addRoom(this.room).subscribe(next => {
      this.router.navigate(['admin','rooms'],{queryParams:{action:'add'}});
    })
  }
  else{
    this.dataService.updateRooms(this.room).subscribe(next => {
      this.router.navigate(['admin','rooms'],{queryParams:{id:this.room.id, action:'edit'}});
    })
  }
}

ngOnDestroy(): void {
  this.formResetEventUnsubc.unsubscribe();
}

}

