import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, forkJoin } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions, StationChartService } from "src/app/services/station-chart.service";
import { StationGroupService } from "src/app/services/station-group.service";
import { StationGroupResponseDto } from "src/app/model/station-group-response.dto";
import { AggregatePeriod, AggregateResponseDto } from "src/app/model/aggregate-response.dto";
import { MeasurementDto } from "src/app/model/measurement.dto";

@Component({
  selector: 'arm-station-group-measurements',
  templateUrl: './station-group-measurements.page.component.html',
  styleUrls: ['./station-group-measurements.page.component.scss']
})
export class StationGroupMeasurementsPageComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  stationGroup!: StationGroupResponseDto;
  groupId!: string;
  currentDate!: Date;
  currentMeasurements!: MeasurementDto[];

  period: AggregatePeriod = 'day';
  aggregate!: AggregateResponseDto;

  routeSubscription!: Subscription;

  constructor(
    private stationGroupService: StationGroupService,
    private stationChartService: StationChartService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.groupId = params.get('groupId') || '';
        this.currentDate = new Date();
        return forkJoin({
          stationGroup: this.stationGroupService.getGroup(this.groupId),
          measurements: this.stationGroupService.getMeasurements(this.groupId, this.currentDate),
          aggregate: this.stationGroupService.getAggregates(this.groupId, this.period, this.currentDate)
        });
      })
    ).subscribe(({ stationGroup, measurements, aggregate }) => {
      this.stationGroup = stationGroup;
      this.currentMeasurements = measurements;
      this.chartOptions = this.stationChartService.buildDataChart(measurements);
      this.aggregate = aggregate;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  forwardDate(): void {
    var date = new Date(this.currentDate.toDateString());
    date.setDate(this.currentDate.getDate() + 1);
    this.currentDate = date;

    this.refreshMeasurements();
    this.refreshAggregate();
  }

  backwardDate(): void {
    var date = new Date(this.currentDate.toDateString());
    date.setDate(this.currentDate.getDate() - 1);
    this.currentDate = date;

    this.refreshMeasurements();
    this.refreshAggregate();
  }

  selectPeriod(period: AggregatePeriod): void {
    this.period = period;
    this.refreshAggregate();
  }

  private refreshMeasurements(): void {
    this.stationGroupService.getMeasurements(this.groupId, this.currentDate).subscribe(measurements => {
      this.currentMeasurements = measurements;
      this.chartOptions = this.stationChartService.buildDataChart(measurements);
    });
  }

  private refreshAggregate(): void {
    this.stationGroupService.getAggregates(this.groupId, this.period, this.currentDate).subscribe(aggregate => {
      this.aggregate = aggregate;
    });
  }
}
