import { BaseStationResponseDto } from "./base-station-response.dto";

export interface StationResponseDto extends BaseStationResponseDto {
  stationGroupId: string;
}
