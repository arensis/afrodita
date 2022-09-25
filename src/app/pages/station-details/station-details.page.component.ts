import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { StationsService } from "src/app/services/stations.service";
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions, StationChartService } from "src/app/services/station-chart.service";

@Component({
  selector: 'arm-station-details',
  templateUrl: './station-details.page.component.html',
  styleUrls: ['./station-details.page.scss']
})
export class StationDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  station!: any;
  lastMeasurement!: any;
  stationId!: string;

  routeSubscription!: Subscription;
  stationServiceSubscription!: Subscription;
  todayMeasurements!: any;

  constructor(
    private stationsService: StationsService,
    private stationChartService: StationChartService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.stationId = params.get('stationId') || '';
      this.stationServiceSubscription = this.station = this.stationsService.getStation(this.stationId).subscribe(station => {
        this.station = station;
        this.todayMeasurements = this.buildTodaymeasurements(station.measurements);
        this.lastMeasurement = this.getLastMeasurement();
        this.chartOptions = this.stationChartService.buildDataChart(this.todayMeasurements);
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

  private buildTodaymeasurements(measurements: any) {
    const now = new Date().toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'});
    const filterMeasurements = measurements.filter((measurement: any) => {
      const measurementDate = new Date(measurement.date).toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'});
      return measurementDate === now;
    })

    return filterMeasurements;
  }

  private getLastMeasurement(): any {
    return this.station.measurements.at(-1);
  }
}
