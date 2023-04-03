import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Trip } from '../trip-data';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit{
  @Input() trip: Trip = {name: "", country: "", start:"",end:"",price: 0, amount: 0, description:"", photo:"",avgRate:0,rateCount:0, amountTaken:0};
  @Input() reserved: number = 0;
  @Input() key!: string;
  @Input() id!:number;
  @Output() reservedChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<Trip>();
  maxAmount: number = 0;
  lowFlag: boolean = false;

  constructor(private tripService: DataService){
  }
  ngOnInit(): void {
    this.maxAmount=this.trip.amount
    if( this.trip.amount-this.trip.amountTaken<3 ){
      this.lowFlag = true;
    }
  }
  increment(): void{
    if( this.trip.amountTaken>0 ){
      this.trip.amountTaken--
      this.reserved--;
      this.tripService.change(this.key, {amountTaken: this.trip.amountTaken})
      this.reservedChange.emit(this.reserved);
    }
    if( this.trip.amount-this.trip.amountTaken>=3 ){
      this.lowFlag = false;
    }
  }
  decrement(): void{
    if( this.trip.amount>this.trip.amountTaken ){
      this.trip.amountTaken++;
      this.reserved++;
      this.tripService.change(this.key, {amountTaken: this.trip.amountTaken})
      console.log(this.key)
    }
    if( this.trip.amount-this.trip.amountTaken<3 ){
      this.lowFlag = true;
    }
 
  }
  removeTrip():void{
    this.remove.emit(this.trip);
  }
  rateUpdate():void{
    console.log(this.trip.avgRate)
    this.tripService.change(this.key, { avgRate: this.trip.avgRate, rateCount: this.trip.rateCount})
  }
 
}
