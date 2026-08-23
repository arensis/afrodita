import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StationGroupResponseDto } from 'src/app/model/station-group-response.dto';
import { StationResponseDto } from 'src/app/model/station-response.dto';
import { StationGroupService } from 'src/app/services/station-group.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'arm-station-group-details',
  templateUrl: './station-group-details.page.component.html',
  styleUrls: ['./station-group-details.page.component.scss']
})
export class StationGroupDetailsPageComponent implements OnInit, OnDestroy {
  stationGroup!: StationGroupResponseDto;
  stations: StationResponseDto[] = [];
  groupId!: string;

  routeSubscription!: Subscription;

  constructor(
    private stationsService: StationsService,
    private stationGroupService: StationGroupService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.groupId = params.get('groupId') || '';
        return forkJoin({
          stationGroup: this.stationGroupService.getGroup(this.groupId),
          stations: this.stationsService.getByGroupId(this.groupId)
        });
      })
    ).subscribe(({ stationGroup, stations }) => {
      this.stationGroup = stationGroup;
      this.stations = stations;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  trackBy(index: number, item: any) {
    return item.id;
  }
}
