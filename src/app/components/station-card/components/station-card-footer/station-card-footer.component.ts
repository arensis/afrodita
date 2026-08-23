import { Component, Input } from '@angular/core';
import { faChartLine, IconDefinition, faSatellite } from '@fortawesome/free-solid-svg-icons';
import { StationGroupResponseDto } from 'src/app/model/station-group-response.dto';
import { StationResponseDto } from 'src/app/model/station-response.dto';
import { StationTypes } from 'src/app/model/station-type-enum';

@Component({
  selector: 'app-station-card-footer',
  templateUrl: './station-card-footer.component.html',
  styleUrls: ['./station-card-footer.component.scss']
})
export class StationCardFooterComponent {
  @Input()
  station!: StationResponseDto | StationGroupResponseDto;
  @Input()
  hasCurrentMeasurement!: boolean;
  @Input()
  lastMeasurementMessage!: string;
  @Input()
  type!: StationTypes;
  @Input()
  hasMeasurements!: boolean;

  isStationGroup: boolean = false;
  chartIcon: IconDefinition = faChartLine;
  stationIcon: IconDefinition = faSatellite;


  ngOnInit() {
    this.isStationGroup = this.type === StationTypes.GROUPED;
  }
}
