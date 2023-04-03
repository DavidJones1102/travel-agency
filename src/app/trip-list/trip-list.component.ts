import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Trip } from '../trip-data';
 
 
@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit{
  //countries: string[] = [];
  //selectedCountry?: string;
  reservedCount: number = 0;
  reserved: number = 0;
  flag: boolean=true;

  trips: Trip[] = [];
  tripsId: string[] = [];
  constructor(private tripService: DataService){
    this.tripService.getData().subscribe(trips => {
      this.trips = trips
    });
    this.tripService.getKeys().subscribe(val => {
      this.tripsId = val.map( (c: { payload: { key: any; }; }) => c.payload.key)
    })
  }
  ngOnInit(): void {
  }
  maxPrice(i: number): boolean{
    var mostExpensive:number= this.trips.reduce((acc:number,b:Trip)=>{
      if(b.amount>0 ) return Math.max(acc,b.price)
      else return acc},0)
    return this.trips[i].amount>0 && this.trips[i].price==mostExpensive;
  }
  minPrice(i: number): boolean{
    var cheapest:number= this.trips.reduce((acc:number,b:Trip)=>{
      if(b.amount>0 ) return Math.min(acc,b.price)
      else return acc},this.trips[i].price+1)
    return this.trips[i].amount>0 && this.trips[i].price==cheapest;
  }
  removeTrip(trip: Trip):void{
    this.tripService.delete(this.tripsId[this.trips.indexOf(trip)])
  }
  
  countReserved():number{
    var sum = this.trips.reduce( (acc,b) => {return acc+b.amountTaken},0)
    this.reserved = sum
    return sum
  }
}
