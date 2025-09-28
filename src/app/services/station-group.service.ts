import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StatoionGroupResponseDto } from "../model/station-group-response.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StationGroupService {
  api = 'https://kairos-weather.ddns.net';

  constructor(private http: HttpClient) { }

    getAll(): Observable<StatoionGroupResponseDto[]> {
      const fullUrl = [this.api, 'station-groups'].join('/');
      return this.http.get<StatoionGroupResponseDto[]>(fullUrl);
    }
}
