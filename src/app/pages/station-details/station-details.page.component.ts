import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { StationsService } from "src/app/services/stations.service";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexMarkers,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  yaxis: ApexYAxis | ApexYAxis[];
  tooltip: ApexTooltip;
};

@Component({
  selector: 'arm-station-details',
  templateUrl: './station-details.page.component.html',
  styleUrls: ['./station-details.page.scss']
})
export class StationDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  station!: any;
  lastMeasurement!: any;
  stationId!: string;

  routeSubscription!: Subscription;
  stationServiceSubscription!: Subscription;
  todayMeasurements!: any;

  constructor(private stationsService: StationsService, private route: ActivatedRoute) {
    this.chartOptions = {
      series: [],
      chart: {
        toolbar: {
          show: false
        },
        type: "line",
        height: 320
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false
        }
      },
      yaxis: [],
      stroke: {
        curve: "smooth"
      },
      markers: {
        size: 1
      },
      tooltip: {
        x: {
          formatter: function(y) {
            return new Date(y).toLocaleTimeString("es-ES");
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.stationId = params.get('stationId') || '';
      this.stationServiceSubscription = this.station = this.stationsService.getStation(this.stationId).subscribe(station => {
        this.station = station;
        this.todayMeasurements = this.buildTodaymeasurements(station.measurements);
        this.lastMeasurement = this.getLastMeasurement();

        const temperatureData = this.todayMeasurements.map((measurement: any) => {
          return {x: new Date(measurement.date), y: measurement.temperature.toFixed(2)};
        });

        const humidityData = this.todayMeasurements.map((measurement: any) => {
          return {x: new Date(measurement.date), y: measurement.humidity.toFixed(2)}
        })

        this.chartOptions.series = [
          {
            name: 'Temperatura',
            type: "line",
            data: temperatureData,
            color: '#FF0000'
          },
          {
            name: 'Humedad',
            type: "area",
            data: humidityData,
            color: '#71bdff'
          }
        ];

        this.chartOptions.yaxis = [
          {
            title: {
              text: 'Temperatura'
            },
            min: Math.min(...this.todayMeasurements.map((measurement: any) => measurement.temperature)),
            max: Math.max(...this.todayMeasurements.map((measurement: any) => measurement.temperature)),
            tickAmount: 5
          },
          {
            opposite: true,
            title: {
              text: 'Humedad'
            }
          }
        ]
      })
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
