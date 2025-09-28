import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-station-card-main',
  templateUrl: './station-card-main.component.html',
  styleUrls: ['./station-card-main.component.scss']
})
export class StationCardMainComponent {
  @Input()
  hasCurrentMeasurement!: boolean;
  @Input()
  currentMeasurement!: any;
}
