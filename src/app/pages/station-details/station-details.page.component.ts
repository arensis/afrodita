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
  currentMeasurements!: any;
  currentDate!: Date;

  constructor(
    private stationsService: StationsService,
    private stationChartService: StationChartService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.stationId = params.get('stationId') || '';
      this.stationServiceSubscription = this.station = this.stationsService.getStation(this.stationId).subscribe(station => {
        this.station = station;
        this.currentDate = new Date();
        this.currentMeasurements = this.findMeasurementsFromDate(this.currentDate, station.measurements);
        this.lastMeasurement = this.getLastMeasurement();
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

    this.currentMeasurements = this.findMeasurementsFromDate(this.currentDate, this.station.measurements);
    this.chartOptions = this.stationChartService.buildDataChart(this.currentMeasurements);

  }

  backwardDate(): void {
    var date = new Date(this.currentDate.toDateString());
    date.setDate(this.currentDate.getDate() - 1);
    this.currentDate = date;

    this.currentMeasurements = this.findMeasurementsFromDate(this.currentDate, this.station.measurements);
    this.chartOptions = this.stationChartService.buildDataChart(this.currentMeasurements);
  }

  private findMeasurementsFromDate(date: Date, measurements: any): any {
    const parsedDate = date.toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'});
    const filterMeasurements = measurements.filter((measurement: any) => {
      const measurementDate = this.buildUniversalDateTimeLocal(measurement.date).toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'});
      return measurementDate === parsedDate;
    })

    return filterMeasurements;
  }

  private buildTodaymeasurements(measurements: any) {
    const now = new Date().toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'});
    const filterMeasurements = measurements.filter((measurement: any) => {
      const measurementDate = this.buildUniversalDateTimeLocal(measurement.date).toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'});
      return measurementDate === now;
    })

    return filterMeasurements;
  }

  private getLastMeasurement(): any {
    return this.station.measurements.at(-1);
  }

  private buildUniversalDateTimeLocal(date: string): Date {
    return new Date(date.slice(0, 19).split(' ').join('T').concat('Z'));
  }
}
