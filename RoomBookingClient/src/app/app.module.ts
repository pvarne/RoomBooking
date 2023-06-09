import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalenderComponent } from './calender/calender.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './admin/users/users.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';

const routes : Routes = [
  {path : 'admin/rooms', component : RoomsComponent},
  {path : 'admin/users', component : UsersComponent},
  {path : '', component : CalenderComponent},
  {path : '404', component: PageNotFoundComponent },
  {path : '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    MenuComponent,
    UsersComponent,
    RoomsComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
