import { BaseStationResponseDto } from "./base-station-response.dto";

export interface StationGroupResponseDto extends BaseStationResponseDto{
  stations: string[];
}
