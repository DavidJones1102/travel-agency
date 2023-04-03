import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { DataService } from './data.service';
import { UpPipePipe } from './up-pipe.pipe';
 
import { AddTripFormComponent } from './add-trip-form/add-trip-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { CartComponent } from './cart/cart.component';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';
import { HistoryComponent } from './history/history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    TripListComponent,
    UpPipePipe,
    AddTripFormComponent,
    RatingComponent,
    HomeComponent,
    TripDetailsComponent,
    CartComponent,
    CartWidgetComponent,
    HistoryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
