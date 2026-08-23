import { LocationResponseDto } from "./location-response.dto";
import { MeasurementResponseDto } from "./station-measurement-response.dto";

export interface BaseStationResponseDto {
  id: string;
  createdDate: Date;
  location: LocationResponseDto;
  currentMeasurement: MeasurementResponseDto;
}
