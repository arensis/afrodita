import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  api = 'https://kairos.alfonsomadrid.net:5000';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    const fullUrl = [this.api, 'stations'].join('/');
    return this.http.get<any[]>(fullUrl);
  }

  getStation(id: string): Observable<any> {
    const fullUrl = [this.api, 'station', id].join('/');
    return this.http.get<any[]>(fullUrl);
  }
}
