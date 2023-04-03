import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { Trip } from '../trip-data';

@Component({
  selector: 'app-add-trip-form',
  templateUrl: './add-trip-form.component.html',
  styleUrls: ['./add-trip-form.component.css']
})
export class AddTripFormComponent{
  constructor(private tripService: DataService){}
  addedTrip?: string
  @Input() flag:boolean = true ;
  @Output() flagEmiter = new EventEmitter<boolean>();
  @Output() tripEmiter = new EventEmitter<Trip>();
  trip?:Trip;
  name: FormControl = new FormControl('aaa',[Validators.required,Validators.minLength(3)]);
  country: FormControl = new FormControl('a',Validators.required );
  start: FormControl = new FormControl('11/11/2022',[Validators.required, Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]);
  end: FormControl = new FormControl('11/15/2022',[Validators.required, Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]);
  price: FormControl = new FormControl('1' ,Validators.required);
  amount: FormControl = new FormControl('1',Validators.required);
  description: FormControl = new FormControl('a',Validators.required);
  photo: FormControl = new FormControl('./../../assets/krk\.jpg',[Validators.required]);
  addTrip = new FormGroup({
    name: this.name,
    country: this.country,
    start: this.start,
    end:this.end,
    price: this.price,
    amount: this.amount,
    description:this.description,
    photo: this.photo
    })

    addTripHandler(name:string,country:string,start:string,end:string,price:number,amount:number,description:string,photo:string):void{
      this.trip = {name:name, country:country, start:start, end:end, amount:amount, description:description, price:price,photo:photo,avgRate:0,rateCount:0, amountTaken: 0}
      this.addedTrip=name;
      this.tripService.add(this.trip)
      }
}


