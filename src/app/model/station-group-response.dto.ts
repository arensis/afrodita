import { BaseStationResponseDto } from "./base-station-response.dto";

export interface StatoionGroupResponseDto extends BaseStationResponseDto{
  stations: string[];
}
