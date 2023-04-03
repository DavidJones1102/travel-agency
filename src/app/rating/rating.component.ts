import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  stars: boolean[] = [false,false,false,false,false]
  notRated: boolean = true;

  @Input() index: number = -1;
  @Input() avgRate: number = 0;
  @Input() rateCount: number = 0;
  rating?: number;
  key: string = ''
  temporaryRating: number = -1;
  constructor( private tripService: DataService){
    this.tripService.getKeys().subscribe(val => {
      this.key = val.map( (c: { payload: { key: any; }; }) => c.payload.key)[this.index]
    })
  }
  count(index: number):void{
    this.temporaryRating = index;
  }
  rate(i:number):void{
    this.notRated=false;
    this.rating = i+1
    this.avgRate = (this.avgRate*this.rateCount+this.rating)/(this.rateCount+1)
    this.avgRate = Math.round((this.avgRate+Number.EPSILON)*10)/10
    this.rateCount++;
    this.tripService.change(this.key, {rateCount: this.rateCount, avgRate:this.avgRate})
  }
}
