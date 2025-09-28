import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { StatoionGroupResponseDto } from 'src/app/model/station-group-response.dto';
import { StationResponseDto } from 'src/app/model/station-response.dto';
import { StationTypes } from 'src/app/model/station-type-enum';
import { StationGroupService } from 'src/app/services/station-group.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'arm-home-page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {

  stations: StationResponseDto[] = [];
  stationGroups: StatoionGroupResponseDto[] = [];
  stationSubscription: any;
  stationGroupType = StationTypes.GROUPED;

  constructor(
    private stationsService: StationsService,
    private stationGroupService: StationGroupService
  ) {}

  ngOnInit(): void {
    const stationSubscription = forkJoin({
      stations: this.stationsService.getAll(),
      stationGroups: this.stationGroupService.getAll()
    })

    stationSubscription.subscribe(observer => {
      this.stations = observer.stations;
      this.stationGroups = observer.stationGroups;
    })
  }

  ngOnDestroy(): void {
    if (this.stationSubscription) {
      this.stationSubscription.unsubscribe();
    }
  }

  trackBy(index: number, item: any) {
    return item.id;
  }
}

