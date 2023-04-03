import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripFormComponent } from './add-trip-form/add-trip-form.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripListComponent } from './trip-list/trip-list.component';

const routes: Routes = [
  { path:'', redirectTo:"/home", pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'list', component: TripListComponent },
  { path: 'trip/:id', component: TripDetailsComponent },
  { path: 'add', component: AddTripFormComponent },
  { path: 'cart', component: CartComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**',pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }