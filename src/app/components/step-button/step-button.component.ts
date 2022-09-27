import { StepButtonType } from './step-button-type.enum';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'arm-step-button',
  templateUrl: './step-button.component.html',
  styleUrls: ['./step-button.component.scss']
})
export class StepButtonComponent implements OnInit {
  @Input()
  stepButtonType!: StepButtonType;
  @Output()
  onClick = new EventEmitter<void>()

  buttonClass!: string;

  ngOnInit(): void {
    this.buttonClass = this.buildButtonClass();
  }

  clickStepButton(): void {
    this.onClick.emit();
  }

  private buildButtonClass(): string {
    return this.stepButtonType === StepButtonType.BACKWARD ? 'wi-direction-left' : 'wi-direction-right';
  }
}
