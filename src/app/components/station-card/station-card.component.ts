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
    this.lastMeasurement = this.getLastMeasurement();
    this.lastMeasurementDateTimeLocal = new Date(this.lastMeasurement.date);
    this.formatedLastMeasurementLocalize = this.buildFormatedLastMeasurementLocalize();
    this.status = this.stationStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lastMeasurement = this.getLastMeasurement();
    this.lastMeasurementDateTimeLocal = new Date(this.lastMeasurement.date);
    this.formatedLastMeasurementLocalize = this.buildFormatedLastMeasurementLocalize();
    this.status = this.stationStatus();
  }

  private getLastMeasurement(): any {
    return this.station.measurements.at(-1);
  }

  private stationStatus(): string {
    let now = Date.now();
    let measurementDate = this.lastMeasurementDateTimeLocal.getTime()
    console.log(`now: ${now}, measurementDate: ${measurementDate}`)
    var diff = Math.abs(Math.round((now - measurementDate) / 1000));

    if (diff > 240 && diff < 600) {
      return 'warning';
    } else if (diff > 600) {
      return 'offline';
    }

    return 'online'
  }

  private buildFormatedLastMeasurementLocalize(): string {
    return this.lastMeasurementDateTimeLocal.toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric',  month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
  }
}
