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
  lastMeasurementDateTimeLocal!: Date;
  formatedLastMeasurementLocalize!: string;
  status: string = 'warning';

  ngOnInit(): void {
    if (this.station.measurements.length > 0) {
      this.lastMeasurement = this.getLastMeasurement();
      this.lastMeasurementDateTimeLocal = this.buildUniversalDateTimeLocal();
      this.formatedLastMeasurementLocalize = this.buildFormatedLastMeasurementLocalize();
      this.status = this.stationStatus();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.station.measurements.length > 0) {
      this.lastMeasurement = this.getLastMeasurement();
      this.lastMeasurementDateTimeLocal = this.buildUniversalDateTimeLocal();
      this.formatedLastMeasurementLocalize = this.buildFormatedLastMeasurementLocalize();
      this.status = this.stationStatus();
    }
  }

  private getLastMeasurement(): any {
    return this.station.measurements.at(-1);
  }

  private stationStatus(): string {
    let now = Date.now();
    let measurementDate = this.lastMeasurementDateTimeLocal.getTime()

    var secondsDiff = Math.abs(Math.round((now - measurementDate) / 1000));

    if (secondsDiff > (45 * 60 * 1000) && secondsDiff < (60 * 60)) {
      return 'warning';
    } else if (secondsDiff > (60 * 60)) {
      return 'offline';
    }

    return 'online'
  }

  private buildFormatedLastMeasurementLocalize(): string {
    return this.lastMeasurementDateTimeLocal.toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric',  month: 'numeric', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: false });
  }

  private buildUniversalDateTimeLocal(): Date {
    return new Date(this.lastMeasurement.date.slice(0, 19).split(' ').join('T').concat('Z'));
  }
}
