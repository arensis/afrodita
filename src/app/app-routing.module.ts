import { HomePageComponent } from './pages/home/home.page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationDetailsPageComponent } from './pages/station-details/station-details.page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'station-details/:stationId', component: StationDetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
