import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StationGroupResponseDto } from "../model/station-group-response.dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MeasurementResponseDto } from "../model/station-measurement-response.dto";
import { MeasurementDto } from "../model/measurement.dto";
import { AggregatePeriod, AggregateResponseDto } from "../model/aggregate-response.dto";

@Injectable({
  providedIn: 'root'
})
export class StationGroupService {
  api = 'https://kairos-weather.ddns.net';

  constructor(private http: HttpClient) { }

    getAll(): Observable<StationGroupResponseDto[]> {
      const fullUrl = [this.api, 'station-groups'].join('/');
      return this.http.get<StationGroupResponseDto[]>(fullUrl);
    }

    getGroup(id: string): Observable<StationGroupResponseDto> {
      const fullUrl = [this.api, 'station-groups', id].join('/');
      return this.http.get<StationGroupResponseDto>(fullUrl);
    }

    getMeasurements(id: string, measurementDate: Date): Observable<MeasurementDto[]> {
      const formatedDate = measurementDate.toISOString().slice(0, 10);

      // Resolucion del downsampling segun dispositivo: menos puntos en movil
      // (mas dificil pulsar un punto en pantalla pequena) que en desktop.
      const isMobile = typeof window !== 'undefined'
        && window.matchMedia('(max-width: 768px)').matches;
      const bucketMinutes = isMobile ? 30 : 10;

      const fullUrl = [this.api, 'station-groups', id, 'measurements']
        .join('/')
        .concat(`?date=${formatedDate}&bucketMinutes=${bucketMinutes}`);
      return this.http.get<MeasurementResponseDto[]>(fullUrl).pipe(map(measurements => measurements.map(measurement => {
        return {
          date: measurement.date.toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'}),
          temperature: measurement.temperature,
          humidity: measurement.humidity,
          airPressure: measurement.airPressure
        } as MeasurementDto
      })));
    }

    getAggregates(id: string, period: AggregatePeriod, date: Date): Observable<AggregateResponseDto> {
      const formatedDate = date.toISOString().slice(0, 10);
      const fullUrl = [this.api, 'station-groups', id, 'aggregates']
        .join('/')
        .concat(`?period=${period}&date=${formatedDate}`);
      return this.http.get<AggregateResponseDto>(fullUrl);
    }
}
