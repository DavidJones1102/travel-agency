import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Trip } from '../trip-data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  trips: Trip[] = [];
  tripsId: string[] = [];
  price: number = 0;
  constructor(private tripService: DataService){
    this.tripService.getData().subscribe(trips => {
      this.trips = trips
    });
    this.tripService.getKeys().subscribe(val => {
      this.tripsId = val.map( (c: { payload: { key: any; }; }) => c.payload.key)
    })
  }

  calcPrice():number{
    var sum = 0
    sum = this.trips.reduce((acc,b)=>{return acc + b.price*b.amountTaken}, 0)
    return sum
  }
  buy(i: number):void{
    var newAmount = this.trips[i].amount-this.trips[i].amountTaken
    this.tripService.change(this.tripsId[i], {amount:newAmount, amountTaken: 0})

  }
  
}
