export type AggregatePeriod = 'day' | 'month' | 'year';

export interface ExtremeDto {
  value: number;
  date: Date;
}

export interface MetricAggregateDto {
  avg: number;
  min: ExtremeDto | null;
  max: ExtremeDto | null;
}

export interface AggregateResponseDto {
  period: AggregatePeriod;
  from: Date;
  to: Date;
  temperature: MetricAggregateDto | null;
  humidity: MetricAggregateDto | null;
  airPressure: MetricAggregateDto | null;
}
