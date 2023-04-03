import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Trip } from '../trip-data';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent {
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
}
