import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AggregatePeriod, AggregateResponseDto } from "src/app/model/aggregate-response.dto";

@Component({
  selector: 'arm-aggregate-summary',
  templateUrl: './aggregate-summary.component.html',
  styleUrls: ['./aggregate-summary.component.scss']
})
export class AggregateSummaryComponent {
  @Input()
  aggregate!: AggregateResponseDto;
  @Input()
  period!: AggregatePeriod;
  @Output()
  onPeriodChange = new EventEmitter<AggregatePeriod>();

  selectPeriod(period: AggregatePeriod): void {
    this.onPeriodChange.emit(period);
  }
}
