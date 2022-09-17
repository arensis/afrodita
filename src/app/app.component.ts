import { StationsService } from './stations.service';
import { Component,  OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'afrodita';
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
  stationSubscription: any;

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

  getLastMeasurement(stationId: string): any {
    const station: any = this.stations.find(station => {
      return station._id.$oid === stationId
    });

    return station.measurements.at(-1);
  }

  stationStatus(lastDate: string): string {
    let now = Date.now();
    let measurementDate = this.stringDateTimeToMilliseconds(lastDate);
    var diff = Math.abs(Math.round((now - measurementDate) / 1000));

    if (diff > 240 && diff < 600) {
      return 'warning';
    } else if (diff > 600) {
      return 'offline';
    }

    return 'online'
  }

  stringDateTimeToMilliseconds(stringDateTime: string): number {
    const dateString = stringDateTime.split('h')[0]
    const [dateValues, timeValues] = dateString.split(' ');

    const [day, month, year] = dateValues.split('/');
    const transformedYear = '20' + year;
    const [hours, minutes] = timeValues.split(':');

    return new Date(+transformedYear, +month - 1, +day, +hours, +minutes).getTime();
  }
}
