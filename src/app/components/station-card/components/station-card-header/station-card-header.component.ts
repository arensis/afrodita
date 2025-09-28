import { Component, Input, OnInit } from '@angular/core';
import { StatoionGroupResponseDto } from 'src/app/model/station-group-response.dto';
import { StationResponseDto } from 'src/app/model/station-response.dto';
import { StationTypes } from 'src/app/model/station-type-enum';
import { faHouseSignal, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-station-card-header',
  templateUrl: './station-card-header.component.html',
  styleUrls: ['./station-card-header.component.scss']
})
export class StationCardHeaderComponent implements OnInit {
  @Input()
  station!: StationResponseDto | StatoionGroupResponseDto;
  @Input()
  lastMeasurementDateTimeLocal!: Date;
  @Input()
  statusClass!: string;
  @Input()
  type!: StationTypes;

  stationGroupIcon!: IconDefinition;

  isStationGroup: boolean = false;

  ngOnInit() {
    this.isStationGroup = this.type === StationTypes.GROUPED;
    this.stationGroupIcon = this.isStationGroup ? faHouseSignal : faSatelliteDish;
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
}
