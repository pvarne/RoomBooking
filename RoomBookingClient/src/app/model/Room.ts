export class Room{
   id : number | undefined;
   name : string | undefined;
   location :string | undefined ;
   capacities = new  Array<LayoutCapacities>() ;
}

export class LayoutCapacities{
    id : number | undefined;
    layout :Layout | undefined ;
    capacity : number| undefined;
}

export enum Layout {
    THEATER = 'Theater',
    USHAPE = 'u-shape',
    BOARD = 'Board Meetings'
}