import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { StationResponseDto } from '../model/station-response.dto';
import { MeasurementResponseDto } from '../model/station-measurement-response.dto';
import { MeasurementDto } from '../model/measurement.dto';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  api = 'https://kairos-weather.ddns.net';

  constructor(private http: HttpClient) { }

  getAll(): Observable<StationResponseDto[]> {
    const fullUrl = [this.api, 'stations'].join('/');
    return this.http.get<StationResponseDto[]>(fullUrl);
  }

  getStation(id: string): Observable<StationResponseDto> {
    const fullUrl = [this.api, 'stations', id].join('/');
    return this.http.get<StationResponseDto>(fullUrl);
  }

  getMeasurements(id: string, measurementDate: Date): Observable<MeasurementDto[]> {
    const formatedDate = measurementDate.toISOString().slice(0, 10);
    console.log(formatedDate);
    const fullUrl = [this.api, 'stations', id, 'measurements'].join('/').concat(`?date=${formatedDate}`);
    return this.http.get<MeasurementResponseDto[]>(fullUrl).pipe(map(measurements => measurements.map(measurement => {
      return {
        date: measurement.date.toLocaleString("es-ES", { day: "numeric", month: 'numeric', year:'numeric'}),
        temperature: measurement.temperature,
        humidity: measurement.humidity,
        airPressure: measurement.airPressure
      } as MeasurementDto
    })));
  }


  private buildUniversalDateTimeLocal(date: string): Date {
    return new Date(date.slice(0, 19).split(' ').join('T').concat('Z'));
  }
}
