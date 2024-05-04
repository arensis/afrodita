import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, forkJoin } from "rxjs";
import { StationsService } from "src/app/services/stations.service";
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions, StationChartService } from "src/app/services/station-chart.service";
import { StationResponseDto } from "src/app/model/station-response.dto";
import { MeasurementResponseDto } from "src/app/model/station-measurement-response.dto";
import { MeasurementDto } from "src/app/model/measurement.dto";

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

  constructor(
    private stationsService: StationsService,
    private stationChartService: StationChartService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.stationId = params.get('stationId') || '';
      this.currentDate = new Date();
      forkJoin([this.stationsService.getStation(this.stationId), this.stationsService.getMeasurements(this.stationId, this.currentDate)]).subscribe(observer => {
        this.station = observer[0];
        this.currentMeasurements = observer[1];
        this.lastMeasurement = this.station.currentMeasurement;
        this.chartOptions = this.stationChartService.buildDataChart(this.currentMeasurements);
      });
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

    this.stationsService.getMeasurements(this.stationId, this.currentDate).subscribe(measurements => {
      this.currentMeasurements = measurements;
      this.chartOptions = this.stationChartService.buildDataChart(this.currentMeasurements);
    });
  }

  backwardDate(): void {
    var date = new Date(this.currentDate.toDateString());
    date.setDate(this.currentDate.getDate() - 1);
    this.currentDate = date;

    this.stationsService.getMeasurements(this.stationId, this.currentDate).subscribe(measurements => {
      this.currentMeasurements = measurements;
      this.chartOptions = this.stationChartService.buildDataChart(this.currentMeasurements);
    });
  }
}
