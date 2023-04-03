import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Trip } from '../trip-data';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent {
  trip: Trip = {name: "", country: "", start:"",end:"",price: 0, amount: 0, description:"", photo:"",avgRate:0,rateCount:0, amountTaken: 0};
  key: string='';

  @Input() reserved: number = 0;
  @Output() reservedChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<Trip>();
  maxAmount: number = 0;
  lowFlag: boolean = false;
  id: number = -1;
  subscription: Subscription | undefined
  constructor(private route: ActivatedRoute, private tripService: DataService){
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']
      this.tripService.getData().subscribe(trips => {
      this.trip = trips[this.id]
      if( this.trip.amount-this.trip.amountTaken<3 ){
        this.lowFlag = true;
      }
      this.tripService.getKeys().subscribe(val => {
        this.key = val.map( (c: { payload: { key: any; }; }) => c.payload.key)[this.id]
      })

    });
  })
}

  
  ngOnInit(): void {
    this.maxAmount=this.trip.amount

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
