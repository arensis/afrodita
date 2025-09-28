import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StatoionGroupResponseDto } from 'src/app/model/station-group-response.dto';
import { StationResponseDto } from 'src/app/model/station-response.dto';
import { StationTypes } from 'src/app/model/station-type-enum';

@Component({
  selector: 'arm-station-card',
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.scss']
})
export class StationCardComponent implements OnInit, OnChanges {
  @Input()
  station!: StationResponseDto | StatoionGroupResponseDto;
  @Input()
  types: StationTypes = StationTypes.STAND_ALONE;

  lastMeasurementMessage!: string;
  currentMeasurement: any;
  lastMeasurementDateTimeLocal!: Date;
  formatedLastMeasurementLocalize!: string;
  status: string = 'warning';
  hasCurrentMeasurement!: boolean;

  isStationGroup!: boolean;


  ngOnInit(): void {
    this.initStationData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initStationData();
  }

  private initStationData() {
    this.isStationGroup = this.types === StationTypes.GROUPED;
    this.hasCurrentMeasurement = this.initHasCurrentMeasurement();
    if (this.hasCurrentMeasurement) {
      this.hasCurrentMeasurement = true;
      this.currentMeasurement = this.station.currentMeasurement;
      this.lastMeasurementDateTimeLocal = this.buildUniversalDateTimeLocal();
      this.formatedLastMeasurementLocalize = this.buildFormatedLastMeasurementLocalize();
      this.lastMeasurementMessage = this.buildLastMeasurementMessage();
      this.status = this.stationStatus();
    } else {
      this.status = 'offline';
    }
  }

  private initHasCurrentMeasurement(): boolean {
    return this.station.currentMeasurement !== undefined &&
      Object.keys(this.station.currentMeasurement).length > 0;
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

  private buildLastMeasurementMessage(): string {
    return this.hasCurrentMeasurement ?
      'Última medición: ' + this.formatedLastMeasurementLocalize :
      'Sin datos';
  }

  private buildFormatedLastMeasurementLocalize(): string {
    return this.lastMeasurementDateTimeLocal.toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric',  month: 'numeric', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: false });
  }

  private buildUniversalDateTimeLocal(): Date {
    return new Date(this.currentMeasurement.date.slice(0, 19).split(' ').join('T').concat('Z'));
  }
}
