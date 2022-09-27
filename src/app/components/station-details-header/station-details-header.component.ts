import { StepButtonType } from './../step-button/step-button-type.enum';
import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
  selector: 'arm-station-details-header',
  templateUrl: './station-details-header.component.html',
  styleUrls: ['./station-details-header.component.scss']
})
export class StationDetailsHeaderComponent implements OnChanges {
  @Input()
  currentMeasurement: any;
  @Input()
  station: any;
  @Input()
  currentDate!: Date;
  @Output()
  onBackwardDate = new EventEmitter<void>();
  @Output()
  onForwardDate = new EventEmitter<void>();

  public StepButtonType = StepButtonType;
  formatedCurrentDate!: string;

  ngOnChanges(): void {
    this.formatedCurrentDate = this.buildCurrentDateLocalString();
  }

  forwardDate() {
    this.onForwardDate.emit();
  }

  backwardDate() {
    this.onBackwardDate.emit();
  }

  private buildCurrentDateLocalString(): string {
    return this.currentDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric'});
  }
}
