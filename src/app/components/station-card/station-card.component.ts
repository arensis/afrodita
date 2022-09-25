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
      this.lastMeasurementDateTimeLocal = new Date(this.lastMeasurement.date);
      this.formatedLastMeasurementLocalize = this.buildFormatedLastMeasurementLocalize();
      this.status = this.stationStatus();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildCategories();
    console.log('caca')
    if (this.station.measurements.length > 0) {
      this.lastMeasurement = this.getLastMeasurement();
      this.lastMeasurementDateTimeLocal = new Date(this.lastMeasurement.date);
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

  private buildCategories(): string[] {
    console.log('mierda');
    let start = new Date(new Date().setUTCHours(-2,0,0,0)).getTime();
    // const hourStep = 60 * 60 * 1000;
    let steps: string[] = [];

    // for(let i = 0; i < 24; i++) {
    //   console.log('start', new Date(start).toLocaleTimeString());
    //   start += hourStep;
    //   console.log('start after added one hour', new Date(start).toLocaleTimeString());
    //   steps.push(new Date(start).toLocaleTimeString())
    // }

    console.log('steps', steps);

    return steps;
  }
}
