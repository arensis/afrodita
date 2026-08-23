import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, forkJoin } from "rxjs";
import { switchMap } from "rxjs/operators";
import { StationsService } from "src/app/services/stations.service";
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions, StationChartService } from "src/app/services/station-chart.service";
import { StationResponseDto } from "src/app/model/station-response.dto";
import { MeasurementResponseDto } from "src/app/model/station-measurement-response.dto";
import { MeasurementDto } from "src/app/model/measurement.dto";
import { AggregatePeriod, AggregateResponseDto } from "src/app/model/aggregate-response.dto";

@Component({
  selector: 'arm-station-details',
  templateUrl: './station-details.page.component.html',
  styleUrls: ['./station-details.page.scss']
})
export class StationDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  station!: StationResponseDto;
  lastMeasurement!: MeasurementResponseDto;
  stationId!: string;

  routeSubscription!: Subscription;
  stationServiceSubscription!: Subscription;
  currentMeasurements!: MeasurementDto[];
  currentDate!: Date;

  period: AggregatePeriod = 'day';
  aggregate!: AggregateResponseDto;

  constructor(
    private stationsService: StationsService,
    private stationChartService: StationChartService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.stationId = params.get('stationId') || '';
        this.currentDate = new Date();
        return forkJoin({
          station: this.stationsService.getStation(this.stationId),
          measurements: this.stationsService.getMeasurements(this.stationId, this.currentDate),
          aggregate: this.stationsService.getAggregates(this.stationId, this.period, this.currentDate)
        });
      })
    ).subscribe(({ station, measurements, aggregate }) => {
      this.station = station;
      this.currentMeasurements = measurements;
      this.lastMeasurement = this.station.currentMeasurement;
      this.chartOptions = this.stationChartService.buildDataChart(this.currentMeasurements);
      this.aggregate = aggregate;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.stationServiceSubscription) {
      this.stationServiceSubscription.unsubscribe();
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
    this.stationsService.getMeasurements(this.stationId, this.currentDate).subscribe(measurements => {
      this.currentMeasurements = measurements;
      this.chartOptions = this.stationChartService.buildDataChart(this.currentMeasurements);
    });
  }

  private refreshAggregate(): void {
    this.stationsService.getAggregates(this.stationId, this.period, this.currentDate).subscribe(aggregate => {
      this.aggregate = aggregate;
    });
  }
}
