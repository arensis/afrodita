import { LocationResponseDto } from './location-response.dto';
import { MeasurementResponseDto } from './station-measurement-response.dto';

export interface StationResponseDto {
  createdDate: Date;
  location: LocationResponseDto;
  currentMeasurement: MeasurementResponseDto;
}
