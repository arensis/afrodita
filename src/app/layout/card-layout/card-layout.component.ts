import { Component, Input, OnInit } from '@angular/core';
import { StationTypes } from 'src/app/model/station-type-enum';

@Component({
  selector: 'arm-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss']
})
export class CardLayoutComponent implements OnInit {
  @Input()
  type!: StationTypes;

  isStationGroup!: boolean;

  ngOnInit(): void {
    this.isStationGroup = this.type === StationTypes.GROUPED;
  }
}
