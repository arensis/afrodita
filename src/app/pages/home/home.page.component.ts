import { Component, OnInit } from '@angular/core';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'arm-home-page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {

  stations: any[] = [];
  stationSubscription: any;

  constructor(private stationsService: StationsService) {}

  ngOnInit(): void {
    this.stationsService.getAll().subscribe((data: any[])=>{
      this.stations = data;
    });
  }

  ngOnDestroy(): void {
    if (this.stationSubscription) {
      this.stationSubscription.unsubscribe();
    }
  }
}

