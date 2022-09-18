import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'arm-station-card',
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.scss']
})
export class StationCardComponent implements OnInit, OnChanges {
  @Input()
  station: any;

  lastMeasurement: any;
  status: string = 'warning';

  ngOnInit(): void {
    console.log('OnInit station', this.station);
    console.log('OnInit status', this.status);
    this.lastMeasurement = this.getLastMeasurement();
    this.status = this.stationStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lastMeasurement = this.getLastMeasurement();
    this.status = this.stationStatus();
  }

  private getLastMeasurement(): any {
    return this.station.measurements.at(-1);
  }

  private stationStatus(): string {
    let now = Date.now();
    let measurementDate = this.stringDateTimeToMilliseconds(this.lastMeasurement.date);
    var diff = Math.abs(Math.round((now - measurementDate) / 1000));

    if (diff > 240 && diff < 600) {
      return 'warning';
    } else if (diff > 600) {
      return 'offline';
    }

    return 'online'
  }

  private stringDateTimeToMilliseconds(stringDateTime: string): number {
    console.log('stringDateTimeToMilliseconds stringDateTime', stringDateTime);
    const dateString = stringDateTime.split('h')[0]
    const [dateValues, timeValues] = dateString.split(' ');

    const [day, month, year] = dateValues.split('/');
    const transformedYear = '20' + year;
    const [hours, minutes] = timeValues.split(':');

    return new Date(+transformedYear, +month - 1, +day, +hours, +minutes).getTime();
  }
}
