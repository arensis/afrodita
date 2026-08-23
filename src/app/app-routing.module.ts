import { HomePageComponent } from './pages/home/home.page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationDetailsPageComponent } from './pages/station-details/station-details.page.component';
import { StationGroupDetailsPageComponent } from './pages/station-group-details/station-group-details.page.component';
import { StationGroupMeasurementsPageComponent } from './pages/station-group-measurements/station-group-measurements.page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'station-details/:stationId', component: StationDetailsPageComponent },
  { path: 'station-group-details/:groupId', component: StationGroupDetailsPageComponent },
  { path: 'station-group-measurements/:groupId', component: StationGroupMeasurementsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
