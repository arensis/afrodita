import { Injectable } from "@angular/core";
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexMarkers, ApexYAxis, ApexTooltip } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  yaxis: ApexYAxis | ApexYAxis[];
  tooltip: ApexTooltip;
};

@Injectable({
  providedIn: 'root'
})
export class StationChartService {
  buildDataChart(measurements: any): ChartOptions {
    let chartOptions: ChartOptions = this.buildBaseMixedChart();

    chartOptions.series = [
      {
        name: 'Temperatura',
        type: "line",
        data: this.buildCurrentDayTemperatureMeasurements(measurements),
        color: '#FF0000'
      },
      {
        name: 'Humedad',
        type: "area",
        data: this.buildCurrentDayHumidityMeasurements(measurements),
        color: '#71bdff'
      }
    ];

    chartOptions.yaxis = [
      {
        title: {
          text: 'Temperatura'
        },
        min: this.getMinCurrentDayTemperature(measurements),
        max: this.getMaxCurrentDayTemperature(measurements),
        tickAmount: 5
      },
      {
        opposite: true,
        title: {
          text: 'Humedad'
        }
      }
    ];

    return chartOptions;
  }

  private buildBaseMixedChart(): ChartOptions {
    return {
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

  private buildCurrentDayTemperatureMeasurements(measurements: any[]) {
    return measurements.map((measurement: any) => {
      return {x: new Date(measurement.date), y: measurement.temperature.toFixed(2)};
    });
  }

  private buildCurrentDayHumidityMeasurements(measurements: any[]) {
    return measurements.map((measurement: any) => {
      return {x: new Date(measurement.date), y: measurement.humidity.toFixed(2)}
    });
  }

  private getMaxCurrentDayTemperature(measurements: any[]): number {
    return Math.max(...measurements.map((measurement: any) => measurement.temperature))
  }

  private getMinCurrentDayTemperature(measurements: any[]): number {
    return Math.min(...measurements.map((measurement: any) => measurement.temperature));
  }
}
