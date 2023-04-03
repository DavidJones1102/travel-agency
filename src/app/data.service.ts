import { Injectable } from '@angular/core';
import { Trip } from './trip-data';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  trips: Trip[] = [
    {name: "Podniebne wakacje", country: "Czechy", start:"29/11/2022",end:"5/12/2022",price: 1000, amount: 10, description:"W planie wyczieczki górskie wyjścia oraz spacer w chmurach", photo:"./../../assets/spacer.webp", avgRate:5, rateCount:10, amountTaken: 0},
    {name: "Górskie opowieści", country: "Polska", start:"11/02/2023",end:"20/02/2023",price: 5000, amount: 20, description:"Zimowe wędrówki wraz z instruktorem alpinizmu, wycieczka dla żądnych przygód", photo:"./../../assets/tatry.jpg", avgRate:2.5, rateCount:10, amountTaken: 0},
    {name: "Miasto miłości", country: "Francja", start:"11/12/2022",end:"17/12/2022",price: 1500, amount: 3, description:"Paryż zimą to gwarancja niezapomnianych wakacji", photo:"./../../assets/eiffla.jpg", avgRate:4.5, rateCount:10, amountTaken: 0},    
    {name: "Mistrzowskie emocje", country: "Katar", start:"14/12/2022",end:"19/12/2022",price: 15000, amount: 2, description:"Finał mistrzostw świata + opalanie w środku zimy czego chcieć więcej?", photo:"./../../assets/katar.jpg", avgRate:4.5, rateCount:10, amountTaken: 0},  
    {name: "Nani?", country: "Japonia", start:"12/10/2023",end:"12/12/2023",price: 100000, amount: 10, description:"Spotkanie z wyjątkową kulturą w kraju kwitnącej wiśni", photo:"./../../assets/japonia.jpg", avgRate:1.5, rateCount:10, amountTaken: 0},  
    {name: "Aloha!", country: "Hawaje", start:"02/01/2023",end:"11/02/2023",price: 11000, amount: 22, description:"Ponad miesiąc na cudownym archipelagu", photo:"./../../assets/Hawaje.jpg", avgRate:4.5, rateCount:10, amountTaken: 0},  
    {name: "Nordycka przygoda", country: "Norwegia", start:"10/07/2023",end:"28/07/2023",price: 10000, amount: 12, description:"432 godzinny dzień polarny, dzięki niemu wykorzystasz czas na maxa!", photo:"./../../assets/norwegia.jpg", avgRate:3.5, rateCount:10, amountTaken: 0},
    {name: "Królewski spacer", country: "Anglia", start:"11/12/2022",end:"15/12/2022",price: 11000, amount: 13, description:"Objazdowa wycieczka po całej Angli", photo:"./../../assets/anglia.jpg", avgRate:4.5, rateCount:10, amountTaken: 0},  
    {name: "Casino star", country: "USA", start:"01/12/2022",end:"10/12/2022",price: 55000, amount: 9, description:"Co się dzieje w Vegas zostaje w Vegas", photo:"./../../assets/vegas.jpg", avgRate:4.5, rateCount:10, amountTaken: 0},  
    {name: "Smoczastycznie", country: "Polska", start:"01/02/2023",end:"10/02/2023",price: 10000, amount: 10, description:" W Krakowie nie zabraknie pięknych zabytków i smacznego jedzenia", photo:"./../../assets/krk.jpg", avgRate:4, rateCount:10, amountTaken: 0}
   ]

  daneRef: Observable<any[]>;
  id: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.daneRef = db.list('Trips').valueChanges(); 
    this.id = db.list('Trips').snapshotChanges();
  }
  
  getData():Observable<any>{
    return this.daneRef;
  }
  getKeys():Observable<any>{
    return this.id;
  }

  add(trip: Trip):void{
    this.db.list('Trips').push(trip);
  }
  
  delete(key: string):void
  {
    this.db.list('Trips').remove(key);
  }
  change(key: string, value: any):void
  {
    this.db.list('Trips').update(key, value);
  }
 
  addAll(): void{
    this.trips.forEach( trip => this.db.list('Trips').push(trip));
  }
}

// [{name: "Podniebne wakacje", country: "Czechy", start:"29/11/2022",end:"5/12/2022",price: 1000, amount: 10, description:"W planie wyczieczki górskie wyjścia oraz spacer w chmurach", photo:"./../../assets/spacer.webp"},
//             {name: "Górskie opowieści", country: "Polska", start:"11/02/2023",end:"20/02/2023",price: 5000, amount: 20, description:"Zimowe wędrówki wraz z instruktorem alpinizmu, wycieczka dla żądnych przygód", photo:"./../../assets/tatry.jpg"},
//             {name: "Miasto miłości", country: "Francja", start:"11/12/2022",end:"17/12/2022",price: 1500, amount: 3, description:"Paryż zimą to gwarancja niezapomnianych wakacji", photo:"./../../assets/eiffla.jpg"},    
//             {name: "Mistrzowskie emocje", country: "Katar", start:"14/12/2022",end:"19/12/2022",price: 15000, amount: 2, description:"Finał mistrzostw świata + opalanie w środku zimy czego chcieć więcej?", photo:"./../../assets/katar.jpg"},  
//             {name: "Nani?", country: "Japonia", start:"12/10/2023",end:"12/12/2023",price: 100000, amount: 10, description:"Spotkanie z wyjątkową kulturą w kraju kwitnącej wiśni", photo:"./../../assets/japonia.jpg"},  
//             {name: "Aloha!", country: "Hawaje", start:"02/01/2023",end:"11/02/2023",price: 11000, amount: 22, description:"Ponad miesiąc na cudownym archipelagu", photo:"./../../assets/Hawaje.jpg"},  
//             {name: "Nordycka przygoda", country: "Norwegia", start:"10/07/2023",end:"28/07/2023",price: 10000, amount: 12, description:"432 godzinny dzień polarny, dzięki niemu wykorzystasz czas na maxa!", photo:"./../../assets/norwegia.jpg"},  
//             {name: "Królewski spacer", country: "Anglia", start:"11/12/2022",end:"15/12/2022",price: 11000, amount: 13, description:"Objazdowa wycieczka po całej Angli", photo:"./../../assets/anglia.jpg"},  
//             {name: "Casino star", country: "USA", start:"01/12/2022",end:"10/12/2022",price: 55000, amount: 9, description:"Co się dzieje w Vegas zostaje w Vegas", photo:"./../../assets/vegas.jpg"},  
//             {name: "Smoczastycznie", country: "Polsa", start:"01/02/2023",end:"10/02/2023",price: 10000, amount: 100, description:" W Krakowie nie zabraknie pięknych zabytków i smacznego jedzenia", photo:"./../../assets/krk.jpg"}
//           ]