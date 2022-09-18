import { Component, OnInit } from '@angular/core';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'arm-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
// stations: any[] = [];
stations: any[] = [
  {
    _id: {
      $oid: "6321a90407ddd45232f83b82"
    },
    createdDate: "14/09/22 10:12h",
    location: {
        name: "Casa Consuelo",
        indoor: true,
        city: "Vegadeo",
        latitude: 43.463297,
        longitude: -7.051219
    },
    measurements: [
      {date: "14/09/22 15:05h", temperature: 28.0, humidity: 73.0},
      {date: "14/09/22 15:05h", temperature: 27.60000038, humidity: 74.0},
      {date: "14/09/22 15:11h", temperature: 27.29999924, humidity: 75.0},
    ]
  }
];
// stationSubscription: any;

constructor(private stationsService: StationsService) {}

ngOnInit(): void {
  // this.stationsService.getAll().subscribe((data: any[])=>{
  //   console.log('stations', data);
  //   this.stations = data;
  // });
}

ngOnDestroy(): void {
  // if (this.stationSubscription) {
  //   this.stationSubscription.unsubscribe();
  // }
}
}
