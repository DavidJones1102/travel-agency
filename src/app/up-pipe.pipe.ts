import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip-data';

@Pipe({ name: 'upPipe' }) 
export class UpPipePipe implements PipeTransform { 
    transform(trips: Trip[], countries: string[]): Trip[] { 
        return trips.filter(trip => countries.includes(trip.country.toLowerCase())) 
        }
}
